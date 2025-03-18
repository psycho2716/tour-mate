"use client";

import Image from "next/image";
import { MapPin, Languages } from "lucide-react";
import { useAnimationInterval } from "@/hooks/useAnimationInterval";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function HeroSection({ heroContent }: { heroContent: ReactNode }) {
    const navigationAnimating = useAnimationInterval(false, 4000);
    const translationAnimating = useAnimationInterval(false, 4000, 2000);

    return (
        <section id="home" className="w-full h-full min-h-screen relative">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10" />
                <Image
                    src="/hero-bg.jpg"
                    alt="Sunset beach with boat"
                    className="object-cover"
                    fill
                    priority
                />
            </div>

            <div className="relative z-10 pt-20 pb-32 md:pt-32 md:pb-40">
                <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-12">
                    <div className="w-full max-w-[700px] text-white space-y-6 text-center md:text-start">
                        {heroContent}
                    </div>

                    <div className="relative w-full max-w-[500px] mt-8">
                        <div
                            className={cn(
                                "absolute top-8 -left-4 bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg z-20 transition-transform duration-1000",
                                navigationAnimating ? "translate-y-[-10px]" : "translate-y-0"
                            )}
                        >
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs font-medium">Real-time Navigation</span>
                        </div>

                        <div className="w-full h-full max-w-[500px] max-h-[500px]">
                            <Image
                                src="/feature-card.png"
                                alt="Tropical beach"
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div
                            className={cn(
                                "absolute bottom-8 -right-4 bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg z-20 transition-transform duration-1000",
                                translationAnimating ? "translate-y-[-10px]" : "translate-y-0"
                            )}
                        >
                            <Languages className="w-4 h-4" />
                            <span className="text-xs font-medium">Instant Translation</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
