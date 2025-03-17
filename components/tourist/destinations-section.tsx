"use client";

import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/data/destinations";
import DestinationCard from "./destination-card";

interface DestinationsSectionProps {
    destinations: Destination[];
    isSearching: boolean;
    searchQuery: string;
    handleClearSearch: () => void;
}

export function DestinationsSection({
    destinations,
    isSearching,
    searchQuery,
    handleClearSearch
}: DestinationsSectionProps) {
    const hasSearchQuery = searchQuery.trim() !== "";
    const hasResults = destinations.length > 0;

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Destinations</h2>
                {hasSearchQuery && (
                    <div className="text-sm text-gray-500">
                        {isSearching ? (
                            <div className="flex items-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Searching...
                            </div>
                        ) : (
                            <span>
                                {hasResults
                                    ? `Found ${destinations.length} result${
                                          destinations.length !== 1 ? "s" : ""
                                      }`
                                    : "No results found"}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {isSearching ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg overflow-hidden border shadow-sm animate-pulse"
                        >
                            <div className="h-48 bg-gray-200" />
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-10 bg-gray-200 rounded w-full mt-4" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : !hasResults && hasSearchQuery ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No destinations found
                    </h3>
                    <p className="text-gray-500">
                        We couldn't find any destinations matching "{searchQuery}"
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => handleClearSearch()}>
                        Clear search
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {destinations.map((destination) => (
                        <DestinationCard key={destination.id} destination={destination} />
                    ))}
                </div>
            )}
        </section>
    );
}
