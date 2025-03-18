"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesTab from "@/components/tourist/planner/activities-tab";
import PreferencesTab from "@/components/tourist/planner/preferences-tab";

export default function PlannerPage() {
    const [activeTab, setActiveTab] = useState("preferences");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [selectedInterests, setSelectedInterests] = useState<ActivityType[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-sm mb-4">
                        AI-Powered
                    </div>
                    <h1 className="text-4xl font-bold mb-2">✨ Personalized Activity Planner ✨</h1>
                    <p className="text-muted-foreground">
                        Let our AI create a custom itinerary based on your preferences, interests,
                        and travel style.
                        <br />
                        Get personalized recommendations for attractions, dining, and experiences.
                    </p>
                </div>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full max-w-5xl mx-auto"
                >
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="preferences">Your Preferences</TabsTrigger>
                        <TabsTrigger value="activities">Generated Activities</TabsTrigger>
                    </TabsList>

                    {/* Preferences Tab */}
                    <PreferencesTab
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        selectedInterests={selectedInterests}
                        setSelectedInterests={setSelectedInterests}
                        additionalInfo={additionalInfo}
                        setAdditionalInfo={setAdditionalInfo}
                        isGenerating={isGenerating}
                        isGenerated={isGenerated}
                        setIsGenerating={setIsGenerating}
                        setIsGenerated={setIsGenerated}
                        setActiveTab={setActiveTab}
                    />

                    {/* Activities Tab */}
                    <ActivitiesTab
                        isGenerating={isGenerating}
                        setIsGenerating={setIsGenerating}
                        isGenerated={isGenerated}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Tabs>
            </div>
        </div>
    );
}
