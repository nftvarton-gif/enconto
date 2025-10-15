"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { EncontoLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, Languages } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSelectLocale = (locale: string) => {
    startTransition(() => {
      router.replace(`/${locale}${pathname.startsWith('/ru') || pathname.startsWith('/en') ? pathname.slice(3) : pathname}`);
    });
  }

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
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSelectLocale('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelectLocale('ru')}>
                Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href="/#contact">Contact Us</Link>
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
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Languages className="mr-2 h-5 w-5" />
                            Change language
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[--radix-dropdown-menu-trigger-width]]">
                        <DropdownMenuItem onClick={() => onSelectLocale('en')}>
                            English
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSelectLocale('ru')}>
                            Русский
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button asChild className="w-full">
                        <Link href="/#contact">Contact Us</Link>
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
