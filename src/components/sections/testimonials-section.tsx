'use client';

import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TESTIMONIALS } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AnimateOnScroll } from '../ui/animate-on-scroll';
import { useTranslations } from 'next-intl';

export function TestimonialsSection() {
  const t = useTranslations('Testimonials');
  const c = useTranslations('Constants');

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('title')}</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                {t('subtitle')}
            </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
            >
            <CarouselContent>
                {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                    <Card className="h-full flex flex-col justify-between bg-card/50 border-border/50">
                        <CardContent className="p-6 flex-grow">
                            <p className="text-muted-foreground italic">&quot;{c(testimonial.text as any)}&quot;</p>
                        </CardContent>
                        <div className="p-6 pt-0 flex items-center gap-4">
                             <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/${testimonial.avatarSeed}/40/40`} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                            </div>
                        </div>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
            </Carousel>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
