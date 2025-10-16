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
    console.error('Telegram Bot Token or Chat ID is not configured in environment variables.');
    throw new Error('Server configuration error: Telegram is not set up.');
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
      // Эта ошибка будет поймана в блоке catch ниже
      throw new Error(`Telegram API responded with status ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error sending Telegram notification:', error.response?.data || error.message);
      // Перебрасываем ошибку с более понятным сообщением для пользователя
      throw new Error('Failed to send message via Telegram. Please check server logs.');
    } else {
      console.error('Unknown error sending Telegram notification:', error);
    }
    // Перебрасываем исходную или новую ошибку, чтобы она была поймана в submitContactForm
    throw error;
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
    // Отправляем уведомление и ждем завершения
    await sendTelegramNotification(name, email, message);
    
    // Возвращаем успех ТОЛЬКО если отправка была успешной
    return {
      message: 'Thank you for your message! We will get back to you soon.',
      status: 'success',
    };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    // Теперь ошибка от sendTelegramNotification будет поймана здесь
    // и отображена пользователю.
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `Could not send your message. Reason: ${errorMessage}`,
      status: 'error',
    };
  }
}
