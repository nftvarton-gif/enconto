'use client';
import { useState } from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { ServicesSection } from '@/components/sections/services-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { AboutSection } from '@/components/sections/about-section';
import { IntegrationsSection } from '@/components/sections/integrations-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  const [prefillMessage, setPrefillMessage] = useState('');

  const handleSetPrefillMessage = (message: string) => {
    setPrefillMessage(message);
    const contactSection = document.getElementById('contact');
    if(contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection onPlanSelect={handleSetPrefillMessage} />
      <AboutSection />
      <IntegrationsSection onIntegrationSelect={handleSetPrefillMessage} />
      <TestimonialsSection />
      <ContactSection prefillMessage={prefillMessage} />
    </div>
  );
}
