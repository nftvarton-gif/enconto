'use client';
import { ContactForm } from "@/components/contact-form";
import { CONTACT_DETAILS } from "@/lib/constants";
import { AnimateOnScroll } from "../ui/animate-on-scroll";
import { Link } from "next-intl/client";
import { useTranslations } from "next-intl";

export function ContactSection({ prefillMessage }: { prefillMessage?: string }) {
    const t = useTranslations('Contact');
    const c = useTranslations('Constants');

    return (
        <section id="contact" className="py-20 lg:py-32 bg-secondary/30">
            <div className="container mx-auto px-4">
                 <AnimateOnScroll className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('title')}</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </AnimateOnScroll>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <AnimateOnScroll>
                        <div className="bg-card p-8 rounded-lg border border-border/50">
                            <h3 className="text-2xl font-bold mb-6">{t('formTitle')}</h3>
                             <ContactForm prefillMessage={prefillMessage} />
                        </div>
                    </AnimateOnScroll>
                     <AnimateOnScroll delay={200}>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">{t('infoTitle')}</h3>
                             <p className="text-muted-foreground">
                                {t('infoDescription')}
                            </p>
                           {CONTACT_DETAILS.map((detail) => (
                               <div key={detail.href} className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary mt-1">
                                        <detail.icon className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{c(detail.name as any)}</h4>
                                        <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors">
                                            {detail.value}
                                        </a>
                                    </div>
                               </div>
                           ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
