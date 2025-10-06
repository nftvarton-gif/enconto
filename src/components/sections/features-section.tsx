import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FEATURES } from '@/lib/constants';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { useTranslations } from 'next-intl';

export function FeaturesSection() {
  const t = useTranslations('Features');
  const f = useTranslations('Constants');

  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('title')}</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="h-full text-center border-2 border-primary/20 shadow-neon-primary-sm hover:border-primary hover:shadow-neon-primary transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full text-primary">
                      <feature.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold">{f(feature.title as any)}</CardTitle>
                  <CardDescription className="pt-2">{f(feature.description as any)}</CardDescription>
                </CardHeader>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
