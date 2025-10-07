'use client';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';

const PRICING_PLANS = {
  monthly: [
    {
      name: "Starter",
      price: "$49",
      description: "For individuals and small teams getting started with automation.",
      features: [
        "10 AI Workflows",
        "Access to 20+ Connectors",
        "Basic Monitoring",
        "Email Support",
      ],
      cta: "Choose Starter",
      message: "Hello! I'm interested in the Starter plan.",
    },
    {
      name: "Pro",
      price: "$99",
      description: "For growing businesses that need more power and support.",
      features: [
        "50 AI Workflows",
        "Access to 100+ Connectors",
        "Advanced Monitoring & Logging",
        "Priority Support",
        "Access to Template Library",
      ],
      cta: "Choose Pro",
      isPopular: true,
      message: "Hello! I'm interested in the Pro plan.",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific security and scalability needs.",
      features: [
        "Unlimited AI Workflows",
        "Premium & Custom Connectors",
        "SSO/SAML Integration",
        "Dedicated Support & SLA",
        "White-labeling Options",
      ],
      cta: "Contact Sales",
      message: "Hello! I'd like to discuss the Enterprise plan for my organization.",
    },
  ],
};


export function PricingSection({ onPlanSelect }: { onPlanSelect: (message: string) => void }) {
  
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
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
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
                  <Button 
                    className="w-full" 
                    variant={plan.isPopular ? 'default' : 'outline'}
                    onClick={() => onPlanSelect(plan.message)}
                  >
                    {plan.cta}
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
