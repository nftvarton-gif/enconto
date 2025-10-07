"use client";
import Link from 'next/link';
import { EncontoLogo } from '@/components/icons';
import { CONTACT_DETAILS } from '@/lib/constants';

export function Footer() {
  const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <EncontoLogo className="h-8 w-8" />
                <span className="font-headline">EncontoAI</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
                Empowering businesses with AI-driven automations and intelligent agent solutions for superior growth and efficiency.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail.value} className="flex items-center gap-3">
                  <div className="text-primary">
                    <detail.icon className="w-5 h-5"/>
                  </div>
                  <a href={detail.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {detail.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EncontoAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
