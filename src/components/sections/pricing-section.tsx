'use client';
import { Link } from 'next-intl';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { useTranslations } from 'next-intl';

export function PricingSection() {
  const t = useTranslations('Pricing');
  
  const PRICING_PLANS = {
    monthly: [
      {
        name: t('plans.starter.name'),
        price: "$49",
        description: t('plans.starter.description'),
        features: [
          t('plans.starter.features.0'),
          t('plans.starter.features.1'),
          t('plans.starter.features.2'),
          t('plans.starter.features.3'),
        ],
        cta: t('plans.starter.cta'),
        message: t('plans.starter.message'),
      },
      {
        name: t('plans.pro.name'),
        price: "$99",
        description: t('plans.pro.description'),
        features: [
          t('plans.pro.features.0'),
          t('plans.pro.features.1'),
          t('plans.pro.features.2'),
          t('plans.pro.features.3'),
          t('plans.pro.features.4'),
        ],
        cta: t('plans.pro.cta'),
        isPopular: true,
        message: t('plans.pro.message'),
      },
      {
        name: t('plans.enterprise.name'),
        price: t('plans.enterprise.price'),
        description: t('plans.enterprise.description'),
        features: [
          t('plans.enterprise.features.0'),
          t('plans.enterprise.features.1'),
          t('plans.enterprise.features.2'),
          t('plans.enterprise.features.3'),
          t('plans.enterprise.features.4'),
        ],
        cta: t('plans.enterprise.cta'),
        message: t('plans.enterprise.message'),
      },
    ],
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('title')}</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.monthly.map((plan, index) => (
            <AnimateOnScroll key={plan.name} delay={index * 100} className="flex">
              <Card className={cn(
                "w-full flex flex-col border-2 transition-all duration-300 hover:-translate-y-2",
                plan.isPopular 
                  ? 'border-primary shadow-neon-primary' 
                  : 'border-border/50 hover:border-primary/50'
              )}>
                {plan.isPopular && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider text-center py-1 rounded-t-lg rounded-b-none flex items-center justify-center gap-1">
                    <Star className="w-4 h-4" />
                    {t('mostPopular')}
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.price !== t('plans.enterprise.price') && <span className="text-muted-foreground">/{t('perMonth')}</span>}
                  </div>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                     <Link 
                        href={{
                          pathname: '/#contact',
                          query: { prefill: plan.message }
                        }}
                      >
                        {plan.cta}
                      </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
