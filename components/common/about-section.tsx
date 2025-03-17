import Image from "next/image";
import SectionHeader from "./section-header";

export function AboutSection() {
    return (
        <section id="about" className="py-20 w-full bg-gray-50">
            <div className="container">
                <SectionHeader
                    title="About  Us"
                    subTitle="Your Trusted Travel Companion"
                    description="Learn about our mission to make travel more accessible and enjoyable for everyone"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] rounded-xl overflow-hidden">
                        <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Our team"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Our Story</h3>
                        <p className="text-muted-foreground">
                            TourMate was founded in 2025 by a group of passionate researchers and
                            tech enthusiasts who believed that technology could make travel more
                            accessible, enjoyable, and enriching for everyone.
                        </p>
                        <p className="text-muted-foreground">
                            Our mission is to leverage cutting-edge AI technology to break down
                            language barriers, simplify navigation, and provide personalized
                            recommendations that help travelers discover the authentic essence of
                            their destinations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
