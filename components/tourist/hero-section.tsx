"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { HeroSection } from "../common/hero-section";

interface DashboardHeroProps {
    onSearch: (query: string) => void;
}

const heroContent = (
    handleSubmit: (e: FormEvent) => void,
    searchQuery: string,
    setSearchQuery: (query: string) => void
) => {
    return (
        <>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your AI-Powered
                <br />
                Travel Companion
            </h1>
            <p className="text-lg md:text-xl opacity-90">
                Explore the world&apos;s most beautiful places with expert guides and personalized
                itineraries
            </p>
            <form onSubmit={handleSubmit} className="relative mt-8">
                <Input
                    type="text"
                    placeholder="Search destinations, landmarks, beaches..."
                    className="pl-10 pr-4 py-[20px] rounded-full bg-white/90 text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />

                <Button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
                    size="icon"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </form>
        </>
    );
};

export function DashboardHero({ onSearch }: DashboardHeroProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSearch(searchQuery);
    };

    return <HeroSection heroContent={heroContent(handleSubmit, searchQuery, setSearchQuery)} />;
}
