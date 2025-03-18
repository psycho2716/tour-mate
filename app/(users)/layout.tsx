import type React from "react";
import type { Metadata } from "next";
import { UserNavbar } from "@/components/common/user-navbar";

export const metadata: Metadata = {
    title: "Dashboard - TourMate",
    description: "Explore destinations and plan your next adventure with TourMate"
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <UserNavbar />
            {children}
        </div>
    );
}
