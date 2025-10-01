'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { generateAiBackground } from '@/ai/flows/dynamic-ai-background';
import { ArrowRight, Rocket } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [bgImage, setBgImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBg = async () => {
      try {
        setIsLoading(true);
        const result = await generateAiBackground();
        setBgImage(result.backgroundImageDataUri);
      } catch (error) {
        console.error('Failed to generate AI background:', error);
        setBgImage('linear-gradient(to bottom right, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3))');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBg();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: bgImage.startsWith('data:') ? `url(${bgImage})` : bgImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLoading ? 0 : 1,
        }}
      />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-pulse"
        />
      )}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-foreground">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 font-headline animate-fade-in-down">
          AI Automations & Smart Agents for <span className="text-primary">Business Growth</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8" style={{animationDelay: '200ms', animationName: 'fade-in-up'}}>
          Enconto helps businesses integrate automation, n8n-workflows and AI assistants to scale up.
        </p>
        <div style={{animationDelay: '400ms', animationName: 'fade-in-up'}}>
          <Button asChild size="lg" className="group">
            <Link href="/#contact">
              <Rocket className="mr-2 h-5 w-5" />
              Start Automation Today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
