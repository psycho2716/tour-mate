"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/navItems";
import { scrollToSection } from "@/lib/scroll-utils";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar({ className }: { className?: string }) {
    const [activeSection, setActiveSection] = useState("home");
    const pathName = usePathname();

    // Function to handle navigation click
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        scrollToSection(sectionId);
    };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => item.sectionId);

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is in view (with some buffer for the navbar)
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "w-full px-10 md:px-44 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50",
                className
            )}
        >
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="relative text-3xl md:text-4xl bottom-0.5">🗺️</span>
                        <span className="font-oleo text-xl text-foreground">TourMate</span>
                    </Link>
                </div>

                <div className="flex items-center justify-center space-x-2">
                    {pathName !== "/login" && pathName !== "/register" && (
                        <>
                            <nav className="hidden md:flex items-center gap-6">
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.sectionId)}
                                        className={`text-sm font-medium transition-colors ${
                                            activeSection === item.sectionId
                                                ? "text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>

                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-sm">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="text-sm">Start Exploring →</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
