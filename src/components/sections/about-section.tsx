import Image from "next/image";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimateOnScroll } from "../ui/animate-on-scroll";

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === "about-us-image");

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="text-center lg:text-left mb-12 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">About EncontoAI</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto lg:mx-0">
                    Our mission is to empower businesses with cutting-edge automation and AI technologies, enabling them to achieve unprecedented growth and efficiency. We value innovation, integrity, and a client-centric approach in everything we do.
                </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_CHOOSE_US.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="relative aspect-[16/6] w-full rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
