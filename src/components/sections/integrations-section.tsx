import Link from "next/link";
import { AnimateOnScroll } from "../ui/animate-on-scroll";
import { Database, Bot, Share2, Component, Waypoints } from "lucide-react";

const integrations = [
    { 
        name: "Social Media APIs", 
        icon: Share2,
        message: "Hello! I'm interested in learning more about your Social Media API integration services."
    },
    { 
        name: "AI Platforms", 
        icon: Bot,
        message: "Hello! I'd like to discuss how your AI Platform integration can benefit my business."
    },
    { 
        name: "Custom Integrations", 
        icon: Component,
        message: "Hello! I have a specific need for a custom integration and would like to learn about your services."
    },
    { 
        name: "CRM Systems", 
        icon: Database,
        message: "Hello! I'm interested in integrating our CRM system and would like to know more."
    },
    { 
        name: "Workflow Tools", 
        icon: Waypoints,
        message: "Hello! I want to optimize my processes and am interested in your workflow tool integration services."
    },
];

export function IntegrationsSection() {
    return (
        <section id="integrations" className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <AnimateOnScroll className="text-center">
                    <h2 className="text-3xl font-bold text-center mb-2 font-headline">Seamless Integrations</h2>
                    <p className="text-muted-foreground text-lg text-center mb-12">We connect with the tools you already use.</p>
                </AnimateOnScroll>
                <AnimateOnScroll delay={200}>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {integrations.map((integration) => (
                             <Link 
                                key={integration.name}
                                href={`/#contact?message=${encodeURIComponent(integration.message)}`}
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
