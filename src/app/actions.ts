'use server';

import { z } from 'zod';
import axios from 'axios';

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
    // This part should now only trigger if the variables are truly missing,
    // and it will now throw an error that will be caught below.
    throw new Error('Telegram Bot Token or Chat ID is not configured.');
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const text = `
New message from your website!

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:*
${message}
  `;

  try {
    const response = await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
    });

    if (response.status !== 200) {
      console.error('Failed to send Telegram notification:', response.data);
      throw new Error('Failed to send Telegram notification.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error sending Telegram notification:', error.response?.data || error.message);
    } else {
      console.error('Unknown error sending Telegram notification:', error);
    }
    // Re-throw the error to be caught by the calling function.
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
