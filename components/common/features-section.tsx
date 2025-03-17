import { features } from "@/data/features";
import SectionHeader from "./section-header";

export function FeaturesSection() {
    return (
        <section id="features" className="py-20 w-full bg-white">
            <div className="container">
                <SectionHeader
                    title="Features"
                    subTitle="Everything you need for seamless travel"
                    description="Discover how TourMate makes travel planning and navigation effortless with
                        cutting-edge technology."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 border rounded-xl hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
