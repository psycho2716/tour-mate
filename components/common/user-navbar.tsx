"use client";

import Link from "next/link";
import { UserDropdown } from "./user-dropdown";

export function UserNavbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/home" className="flex items-center space-x-2">
                        <span className="relative text-3xl md:text-4xl bottom-0.5">🗺️</span>
                        <span className="font-oleo text-xl text-foreground">TourMate</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/dashboard" className="text-sm font-medium text-foreground">
                        Home
                    </Link>
                    <Link
                        href="/dashboard/bookings"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Bookings
                    </Link>
                    <Link
                        href="/dashboard/planner"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Planner
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
}
