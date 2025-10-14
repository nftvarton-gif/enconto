'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function TikTokCallbackPage() {
  useEffect(() => {
    // В реальном приложении здесь бы вы получили `code` и `state`
    // из параметров URL и отправили бы их на ваш бэкенд
    // для обмена на токен доступа.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
      console.log('Код авторизации TikTok:', code);
      console.log('State:', state);
      // Здесь обычно вызывается серверное действие или API-маршрут
      // для завершения OAuth-процесса.
    } else {
      console.error('Код авторизации TikTok не найден.');
    }

    // В будущем здесь можно будет перенаправить пользователя
    // в его личный кабинет. Пока просто остаемся на этой странице.
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="flex items-center gap-4 p-8 bg-card rounded-lg shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div>
          <h1 className="text-xl font-bold">Аутентификация с TikTok...</h1>
          <p className="text-muted-foreground">Пожалуйста, подождите, мы завершаем настройку.</p>
        </div>
      </div>
    </div>
  );
}
