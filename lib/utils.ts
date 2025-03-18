import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCountryAbbreviation(country: string): string {
    // Handle empty or invalid input
    if (!country || typeof country !== "string") return "--";

    // Split the country name into words
    const words = country.trim().split(/\s+/);

    if (words.length === 1) {
        // For single word countries, take first two letters
        return country.slice(0, 2).toUpperCase();
    } else {
        // For multi-word countries, take first letter of each word (up to 2 letters)
        return words
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }
}
