import { AnimateOnScroll } from "../ui/animate-on-scroll";
import { TikTokIcon, TelegramIcon } from "../icons";
import { Database, Bot } from "lucide-react";

const integrations = [
    { name: "TikTok", icon: TikTokIcon },
    { name: "Abacus.ai", icon: Bot },
    { name: "Telegram", icon: TelegramIcon },
    { name: "CRM Systems", icon: Database },
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        {integrations.map((integration, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <integration.icon 
                                    className="h-10 w-auto text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
                                    aria-label={integration.name}
                                />
                                {typeof integration.icon !== 'function' && <span className="ml-2 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground">{integration.name}</span>}
                            </div>
                        ))}
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
