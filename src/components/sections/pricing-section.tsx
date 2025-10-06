import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Flexible Plans for Every Team</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Choose the right plan to unlock the power of AI automation for your business.
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
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
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
                    <Link href={`/#contact?message=${encodeURIComponent(plan.message)}`}>{plan.cta}</Link>
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
