'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error';
  fieldErrors?: Record<string, string[] | undefined>;
} | {
  message: null;
  status: null;
  fieldErrors?: null;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      message: "Please correct the errors in the form.",
      status: 'error',
      fieldErrors: errors,
    };
  }

  const webhookUrl = 'https://n8n.enconto.net/webhook/contact';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    return {
      message: 'Thank you for your message! We will get back to you soon.',
      status: 'success',
    };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      status: 'error',
    };
  }
}
