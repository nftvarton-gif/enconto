"use server";

import { sendTelegramMessage } from "@/lib/telegram";

function sanitize(v: unknown) {
  return String(v ?? "").trim().slice(0, 500);
}

export async function submitLead(formData: FormData) {
  try {
    const name = sanitize(formData.get("name"));
    const contact = sanitize(formData.get("contact"));
    const message = sanitize(formData.get("message"));

    if (!name || !contact) {
      return { ok: false, error: "Укажите имя и контакт" };
    }

    const text = [
      "🟢 Новая заявка с enconto.net",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      message ? `Сообщение: ${message}` : null,
      `Время: ${new Date().toISOString()}`
    ]
      .filter(Boolean)
      .join("\n");

    await sendTelegramMessage(text);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Unknown error" };
  }
}
