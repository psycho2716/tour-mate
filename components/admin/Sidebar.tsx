"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, MapPin, Users, UserCog, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Destinations", href: "/admin/destinations", icon: MapPin },
    { name: "Tourists Logs", href: "/admin/tourists", icon: Users },
    { name: "Tour Guides", href: "/admin/guides", icon: UserCog }
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        toast.success("Logged out successfully");
        router.push("/");
    };

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="flex items-center space-x-2">
                    <span className="relative text-3xl md:text-4xl bottom-0.5">🗺️</span>
                    <span className="font-oleo text-2xl text-foreground">TourMate</span>
                </Link>
            </div>
            <nav className="flex flex-col flex-1 space-y-1 px-3 py-4">
                <div className="flex-1 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                                    isActive
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0",
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-400 group-hover:text-gray-900"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <button
                    onClick={handleLogout}
                    className="group bg-red-600 flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-red-700 w-full mt-auto space-x-2"
                >
                    <span>Logout</span>
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                </button>
            </nav>
        </div>
    );
}
