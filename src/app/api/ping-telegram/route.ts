import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "ENV missing", token: !!token, chatId: !!chatId },
      { status: 500 }
    );
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: "Ping from enconto.net" }),
    cache: "no-store"
  });

  const body = await res.text();
  return NextResponse.json({ ok: res.ok, status: res.status, body });
}
