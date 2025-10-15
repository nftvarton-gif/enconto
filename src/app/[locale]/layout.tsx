
import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'EncontoAI - AI Automations & Smart Agents',
  description: 'AI Automations, Smart Agents, n8n integrations, and SaaS solutions for business growth.',
  icons: {
    icon: '/favicon.svg',
  },
};

const locales = ['en', 'ru'];
 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
 
export default function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(params.locale);
  const messages = useMessages();
 
  return (
    <html lang={params.locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
        )}
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
