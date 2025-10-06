'use client'
import { Link } from 'next-intl';
import { AnimateOnScroll } from "../ui/animate-on-scroll";
import { Database, Bot, Share2, Component, Waypoints } from "lucide-react";
import { useTranslations } from "next-intl";

export function IntegrationsSection() {
    const t = useTranslations('Integrations');

    const integrations = [
        { 
            name: t('socialMedia.name'),
            icon: Share2,
            message: t('socialMedia.message')
        },
        { 
            name: t('aiPlatforms.name'),
            icon: Bot,
            message: t('aiPlatforms.message')
        },
        { 
            name: t('custom.name'),
            icon: Component,
            message: t('custom.message')
        },
        { 
            name: t('crm.name'),
            icon: Database,
            message: t('crm.message')
        },
        { 
            name: t('workflow.name'),
            icon: Waypoints,
            message: t('workflow.message')
        },
    ];

    return (
        <section id="integrations" className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <AnimateOnScroll className="text-center">
                    <h2 className="text-3xl font-bold text-center mb-2 font-headline">{t('title')}</h2>
                    <p className="text-muted-foreground text-lg text-center mb-12">{t('subtitle')}</p>
                </AnimateOnScroll>
                <AnimateOnScroll delay={200}>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {integrations.map((integration) => (
                             <Link 
                                key={integration.name}
                                href={{
                                  pathname: '/#contact',
                                  query: { prefill: integration.message }
                                }}
                                className="flex flex-col items-center gap-2 text-center group"
                             >
                                <integration.icon 
                                    className="h-10 w-10 text-muted-foreground/60 transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))] "
                                    aria-label={integration.name}
                                />
                                <span className="text-sm text-muted-foreground/80 transition-colors duration-300 group-hover:text-foreground">{integration.name}</span>
                            </Link>
                        ))}
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
