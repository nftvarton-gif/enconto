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

async function sendTelegramNotification(name: string, email: string, message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram Bot Token or Chat ID is not configured.');
    // Silently fail if not configured, but log the error on the server.
    return;
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
    await fetch(telegramApiUrl, {
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
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
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
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      message: "Please correct the errors in the form.",
      status: 'error',
      fieldErrors: errors,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Send notification to Telegram
  await sendTelegramNotification(name, email, message);


  // The original webhook call is kept, in case it's still needed.
  // It can be removed if Telegram is the only notification channel.
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
      // Don't throw an error to the user if the webhook fails, but log it.
      console.error(`Webhook responded with status: ${response.status}`);
    }

    return {
      message: 'Thank you for your message! We will get back to you soon.',
      status: 'success',
    };
  } catch (error) {
    console.error('Failed to submit contact form to webhook:', error);
    // Even if the webhook fails, the Telegram message might have succeeded.
    // Return a success message to the user.
    return {
      message: 'Thank you for your message! We will get back to you soon.',
      status: 'success',
    };
  }
}
