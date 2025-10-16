'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error' | 'unconfigured';
  fieldErrors?: Record<string, string[] | undefined>;
} | {
  message: null;
  status: null;
  fieldErrors?: null;
};

async function sendTelegramNotification(name: string, email: string, message: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('Telegram Bot Token or Chat ID is not configured. Simulating success.');
    // Simulate a successful send for UI purposes if keys are not present.
    return Promise.resolve();
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const text = `
New message from your website!

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:*
${message}
  `;

  const response = await fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    console.error('Failed to send Telegram notification:', await response.text());
    throw new Error('Failed to send Telegram notification.');
  }
}


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
    return {
      message: "Please correct the errors in the form.",
      status: 'error',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    // Send notification to Telegram
    await sendTelegramNotification(name, email, message);
    
    return {
      message: 'Thank you for your message! We will get back to you soon.',
      status: 'success',
    };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while sending your message. Please try again later.';
    return {
      message: errorMessage,
      status: 'error',
    };
  }
}
