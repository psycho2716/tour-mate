import type React from "react";
import type { Metadata } from "next";
import { Inter, Oleo_Script, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const oleoScript = Oleo_Script({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oleo-script"
});
const playfair = Playfair_Display({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-playfair",
    style: ["normal", "italic"]
});

export const metadata: Metadata = {
    title: "TourMate - Your AI-Powered Travel Companion",
    description:
        "Explore the world's most beautiful places with expert guides and personalized itineraries"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${oleoScript.variable} ${playfair.variable}`}
            suppressHydrationWarning
        >
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <div className="flex min-h-screen flex-col">
                        <div className="flex-1">{children}</div>
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
