import { AnimateOnScroll } from "../ui/animate-on-scroll";
import { Database, Bot, Share2, Component, Waypoints } from "lucide-react";

const integrations = [
    { name: "Social Media APIs", icon: Share2 },
    { name: "AI Platforms", icon: Bot },
    { name: "Custom Integrations", icon: Component },
    { name: "CRM Systems", icon: Database },
    { name: "Workflow Tools", icon: Waypoints },
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
                        {integrations.map((integration, index) => (
                             <div key={index} className="flex flex-col items-center gap-2 text-center group">
                                <integration.icon 
                                    className="h-10 w-10 text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary"
                                    aria-label={integration.name}
                                />
                                <span className="text-sm text-muted-foreground/80 transition-colors duration-300 group-hover:text-foreground">{integration.name}</span>
                            </div>
                        ))}
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
