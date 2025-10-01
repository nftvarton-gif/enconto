import Link from 'next/link';
import { EncontoLogo } from '@/components/icons';
import { NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <EncontoLogo className="h-8 w-8" />
                <span className="font-headline">EncontoAI</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
                AI Automations & Smart Agents for Business Growth.
            </p>
          </div>
          <div className="md:justify-self-end">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EncontoAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
