import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES } from '@/lib/constants';
import { AnimateOnScroll } from '../ui/animate-on-scroll';

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            From workflow automation to custom SaaS solutions, we provide the expertise to elevate your business.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 100} className="flex">
              <Card className="w-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-neon-accent transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
