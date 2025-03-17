import Link from "next/link";
import { navItems } from "@/data/navItems";
import socials from "@/data/socials";

export function Footer() {
    return (
        <footer className="w-full bg-black text-white py-10">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div className="flex items-center gap-2 mb-6 md:mb-0">
                        <span className="relative text-3xl md:text-4xl bottom-0.5">🗺️</span>
                        <span className="font-oleo text-xl text-white">TourMate</span>
                    </div>

                    <nav className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-6 md:mb-0">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {socials.map((social) => (
                            <Link key={social.name} href={social.href} aria-label={social.name}>
                                {social.icon()}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <p>© 2025 TourMate. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
