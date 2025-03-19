"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MapPin, Users, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Destinations", href: "/admin/destinations", icon: MapPin },
    { name: "Tourists Logs", href: "/admin/tourists", icon: Users },
    { name: "Tour Guides", href: "/admin/guides", icon: UserCog }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="text-xl font-semibold">
                    TourMate
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
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
            </nav>
        </div>
    );
}
