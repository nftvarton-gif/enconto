import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { IntegrationsSection } from '@/components/sections/integrations-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <AboutSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
