"use client";

import Link from "next/link";
import { UserDropdown } from "./user-dropdown";
import { usePathname } from "next/navigation";
import userNavLinks from "@/data/user-nav-links";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function UserNavbar() {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/home" className="flex items-center space-x-2">
                        <span className="relative text-3xl md:text-4xl bottom-0.5">🗺️</span>
                        <span className="font-oleo text-xl text-foreground">TourMate</span>
                    </Link>
                </div>
                <div className="flex gap-4">
                    {!(pathName.startsWith("/tour-guide") || pathName.startsWith("/admin")) && (
                        <>
                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-6">
                                {userNavLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-sm text-foreground ${
                                            pathName === link.href ? "font-bold" : ""
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Navigation */}
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild className="md:hidden">
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="top" className="h-[30vh] pt-16">
                                    <nav className="flex flex-col items-center justify-center h-full gap-8">
                                        {userNavLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`text-lg font-medium text-foreground transition-colors hover:text-primary ${
                                                    pathName === link.href
                                                        ? "font-bold text-primary"
                                                        : ""
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </>
                    )}

                    <div className="flex items-center gap-4">
                        <UserDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
}
