'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'next-intl/navigation';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
        <div className="absolute inset-0 w-full h-full bg-background">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(var(--primary-rgb),0.2),rgba(255,255,255,0))] animate-blob-1"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(var(--accent-rgb),0.2),rgba(255,255,255,0))] animate-blob-2"></div>
        </div>

      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-foreground">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 font-headline animate-fade-in-down">
          {t.rich('title', {
            span: (chunks) => <span className="text-primary">{chunks}</span>
          })}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8" style={{animationDelay: '200ms', animationName: 'fade-in-up'}}>
          {t('subtitle')}
        </p>
        <div style={{animationDelay: '400ms', animationName: 'fade-in-up'}}>
          <Button asChild size="lg" className="group">
            <Link href="/#contact">
              <Rocket className="mr-2 h-5 w-5" />
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
