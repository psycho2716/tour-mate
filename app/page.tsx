import { AboutSection } from "@/components/common/about-section";
import { FeaturesSection } from "@/components/common/features-section";
import { HeroSection } from "@/components/common/hero-section";
import { HowItWorksSection } from "@/components/common/how-it-works-section";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar className="sticky top-0 z-50" />
            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <HowItWorksSection />
            <Footer />
        </main>
    );
}
