import { AboutSection } from "@/components/common/about-section";
import { FeaturesSection } from "@/components/common/features-section";
import { HeroSection } from "@/components/common/hero-section";
import { HowItWorksSection } from "@/components/common/how-it-works-section";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import Link from "next/link";

const heroContent = () => {
    return (
        <>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your AI-Powered
                <br />
                Travel Companion
            </h1>
            <p className="text-lg md:text-xl opacity-90">
                Explore the world&apos;s most beautiful places with expert guides and personalized
                itineraries
            </p>
            <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-3 rounded-full font-medium inline-block"
            >
                Explore Now
            </Link>
        </>
    );
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar className="sticky top-0 z-50" />
            <HeroSection heroContent={heroContent()} />
            <FeaturesSection />
            <AboutSection />
            <HowItWorksSection />
            <Footer />
        </main>
    );
}
