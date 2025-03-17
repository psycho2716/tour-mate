import type React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/navbar";

export const metadata: Metadata = {
    title: "Authentication - TourMate",
    description: "Log in or create an account to access TourMate's features"
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar for auth pages */}
            <Navbar className="sticky top-0 z-50" />

            {/* Main content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
