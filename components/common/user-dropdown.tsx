import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { users } from "@/data/mockData";
import { User } from "@/types/types";

export function UserDropdown() {
    const router = useRouter();
    const pathname = usePathname();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        // Determine user type based on URL path
        let userType = "tourist"; // default
        if (pathname?.includes("tour-guide")) {
            userType = "tour-guide";
        } else if (pathname?.includes("admin")) {
            userType = "admin";
        }

        // Find matching user from mockData
        const matchedUser = users.find((user) => user.type === userType);
        if (matchedUser) {
            setCurrentUser(matchedUser);
        }
    }, [pathname]);

    const handleLogout = () => {
        setIsLoggingOut(true);

        // Simulate logout process
        setTimeout(() => {
            setIsLoggingOut(false);

            toast("Logged out successfully", {
                description: "Redirecting to home page..."
            });

            // Redirect to home page after a short delay
            setTimeout(() => {
                router.push("/");
            }, 1000);
        }, 800);
    };

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    if (!currentUser) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                    <AvatarImage
                        src={currentUser.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={currentUser.name}
                    />
                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {currentUser.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
