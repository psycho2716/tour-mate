"use client";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { mockActivities } from "@/data/activities";
import { format } from "date-fns";
import {
    Loader2,
    Mountain,
    Waves,
    RefreshCw,
    MapPin,
    ShoppingBag,
    Music,
    Utensils,
    Building,
    CheckCheckIcon
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ActivityBookingModal } from "./activity-booking-modal";

interface ActivityTabProps {
    isGenerating: boolean;
    setIsGenerating: (isGenerating: boolean) => void;
    isGenerated: boolean;
    startDate: Date | undefined;
    endDate: Date | undefined;
}

const ActivitiesTab = ({
    isGenerating,
    setIsGenerating,
    isGenerated,
    startDate,
    endDate
}: ActivityTabProps) => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const handleRegenerate = async () => {
        setIsGenerating(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsGenerating(false);
    };

    return (
        <>
            <TabsContent value="activities">
                {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                        <p className="text-lg font-medium">
                            Generating your personalized itinerary...
                        </p>
                        <p className="text-muted-foreground">This may take a few moments</p>
                    </div>
                ) : isGenerated ? (
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-center md:text-start">
                                    Your Generated Activities
                                </h2>
                                <p className="text-muted-foreground text-center md:text-start">
                                    2 day itinerary activities for you
                                </p>
                                <div className="flex justify-center md:justify-start items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1.5 text-xs bg-slate-100 px-4 py-1 rounded-full font-semibold">
                                        <Mountain className="w-4 h-4" />
                                        Nature
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-xs bg-slate-100 px-4 py-1 rounded-full font-semibold">
                                        <Waves className="w-4 h-4" />
                                        Beach
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => setIsBookingModalOpen(true)}
                                >
                                    <CheckCheckIcon className="h-4 w-4 mr-2" />
                                    Book Now
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleRegenerate}>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Regenerate
                                </Button>
                            </div>
                        </div>

                        {/* Activities List */}
                        <div className="space-y-8">
                            {/* Day 1 */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Day 1: {format(startDate!, "PPP")}
                                </h3>
                                <div className="space-y-6">
                                    {mockActivities.slice(0, 2).map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex flex-col md:flex-row gap-6 items-start"
                                        >
                                            <div className="relative w-full md:w-64 h-40 rounded-lg overflow-hidden">
                                                <Image
                                                    src={activity.image}
                                                    alt={activity.name}
                                                    width={256}
                                                    height={160}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                    <span className="px-4 py-1.5 border border-border rounded-full text-xs">
                                                        {activity.time}
                                                    </span>
                                                    <span className="px-4 py-1.5 border border-border rounded-full text-xs inline-flex items-center gap-1">
                                                        {activity.type === "beach" ? (
                                                            <Waves className="w-4 h-4" />
                                                        ) : activity.type === "nature" ? (
                                                            <Mountain className="w-4 h-4" />
                                                        ) : activity.type === "cultural" ? (
                                                            <Building className="w-4 h-4" />
                                                        ) : activity.type === "shopping" ? (
                                                            <ShoppingBag className="w-4 h-4" />
                                                        ) : activity.type === "nightlife" ? (
                                                            <Music className="w-4 h-4" />
                                                        ) : activity.type === "food" ? (
                                                            <Utensils className="w-4 h-4" />
                                                        ) : null}

                                                        {activity.type}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl font-semibold mb-2">
                                                    {activity.name}
                                                </h4>
                                                <p className="text-muted-foreground mb-3">
                                                    {activity.description}
                                                </p>
                                                <div className="flex items-center text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {activity.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Day 2 */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Day 2: {format(endDate!, "PPP")}
                                </h3>
                                <div className="space-y-6">
                                    {mockActivities.slice(2).map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex flex-col md:flex-row gap-6 items-start"
                                        >
                                            <div className="relative w-full md:w-64 h-40 rounded-lg overflow-hidden">
                                                <Image
                                                    src={activity.image}
                                                    alt={activity.name}
                                                    width={256}
                                                    height={160}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                    <span className="px-4 py-1.5 border border-border rounded-full text-xs">
                                                        {activity.time}
                                                    </span>
                                                    <span className="px-4 py-1.5 border border-border rounded-full text-xs inline-flex items-center gap-1">
                                                        {activity.type === "beach" ? (
                                                            <Waves className="w-4 h-4" />
                                                        ) : activity.type === "nature" ? (
                                                            <Mountain className="w-4 h-4" />
                                                        ) : activity.type === "cultural" ? (
                                                            <Building className="w-4 h-4" />
                                                        ) : activity.type === "shopping" ? (
                                                            <ShoppingBag className="w-4 h-4" />
                                                        ) : activity.type === "nightlife" ? (
                                                            <Music className="w-4 h-4" />
                                                        ) : activity.type === "food" ? (
                                                            <Utensils className="w-4 h-4" />
                                                        ) : null}

                                                        {activity.type}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl font-semibold mb-2">
                                                    {activity.name}
                                                </h4>
                                                <p className="text-muted-foreground mb-3">
                                                    {activity.description}
                                                </p>
                                                <div className="flex items-center text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {activity.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg font-medium">No activities generated yet</p>
                        <p className="text-muted-foreground">
                            Fill in your preferences and generate an itinerary to see activities
                            here
                        </p>
                    </div>
                )}
            </TabsContent>

            {/* Activity Booking Modal */}
            <ActivityBookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                startDate={startDate}
                endDate={endDate}
                activities={mockActivities}
            />
        </>
    );
};

export default ActivitiesTab;
