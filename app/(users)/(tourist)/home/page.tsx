"use client";

import { useState, useRef } from "react";
import { DashboardHero } from "@/components/tourist/hero-section";
import { ExploreMapSection } from "@/components/tourist/explore-map-section";
import { destinations as allDestinations } from "@/data/mockData";
import { EventsSection } from "@/components/tourist/events-section";
import { DestinationsSection } from "@/components/tourist/destinations-section";

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [filteredDestinations, setFilteredDestinations] = useState(allDestinations);
    const destinationsRef = useRef<HTMLDivElement>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setIsSearching(true);

        // Simulate search delay
        setTimeout(() => {
            if (query.trim() === "") {
                setFilteredDestinations(allDestinations);
            } else {
                const lowercaseQuery = query.toLowerCase();
                const results = allDestinations.filter(
                    (destination) =>
                        destination.name.toLowerCase().includes(lowercaseQuery) ||
                        destination.location.toLowerCase().includes(lowercaseQuery) ||
                        destination.description.toLowerCase().includes(lowercaseQuery) ||
                        destination.category.toLowerCase().includes(lowercaseQuery) ||
                        destination.keywords.some((keyword) =>
                            keyword.toLowerCase().includes(lowercaseQuery)
                        )
                );
                setFilteredDestinations(results);
            }
            setIsSearching(false);

            // Scroll to destinations section after search completes
            if (destinationsRef.current) {
                const navbarHeight = 64; // Approximate height of navbar in pixels
                const yOffset = -navbarHeight - 20; // Additional offset for spacing
                const y =
                    destinationsRef.current.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;

                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });
            }
        }, 500);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setFilteredDestinations(allDestinations);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <DashboardHero onSearch={handleSearch} />
                <div className="container mx-auto px-4 py-8 space-y-12">
                    <EventsSection />
                    <div ref={destinationsRef}>
                        <DestinationsSection
                            destinations={filteredDestinations}
                            isSearching={isSearching}
                            searchQuery={searchQuery}
                            handleClearSearch={handleClearSearch}
                        />
                    </div>
                    <ExploreMapSection />
                </div>
            </main>
        </div>
    );
}
