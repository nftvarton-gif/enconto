"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next-intl/navigation';
import { Link, useLocale, useTranslations } from 'next-intl';

import { EncontoLogo } from '@/components/icons';
import { LANGUAGE_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, Globe } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [selectedLanguage, setSelectedLanguage] = useState(() => LANGUAGE_OPTIONS.find(l => l.code === locale) || LANGUAGE_OPTIONS[0]);

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, {locale: newLocale});
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {LANGUAGE_OPTIONS.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onSelect={() => switchLocale(lang.code)}
                        className={cn("flex items-center gap-2", selectedLanguage.code === lang.code && "bg-accent")}
                    >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('Header');
  const pathname = usePathname();
  
  const NAV_LINKS = [
    { href: "/", label: t('nav.home') },
    { href: "/#services", label: t('nav.services') },
    { href: "/#pricing", label: t('nav.pricing') },
    { href: "/#about", label: t('nav.about') },
    { href: "/#contact", label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <EncontoLogo className="h-8 w-8" />
          <span className="font-headline">EncontoAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild>
            <Link href="/#contact">{t('contactButton')}</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                     <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <EncontoLogo className="h-8 w-8" />
                        <span className="font-headline">EncontoAI</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-6 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        'text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-4">
                    <div className="flex justify-center">
                        <LanguageSwitcher />
                    </div>
                    <Button asChild className="w-full">
                        <Link href="/#contact">{t('contactButton')}</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
