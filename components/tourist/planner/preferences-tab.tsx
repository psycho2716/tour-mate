import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import { activityTypes } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { ActivityType } from "@/types/types";

interface PreferencesTabProps {
    startDate: Date | undefined;
    setStartDate: (date: Date) => void;
    endDate: Date | undefined;
    setEndDate: (date: Date) => void;
    setIsGenerating: (isGenerating: boolean) => void;
    setIsGenerated: (isGenerated: boolean) => void;
    setActiveTab: (tab: string) => void;
    selectedInterests: ActivityType[];
    setSelectedInterests: (interests: ActivityType[]) => void;
    additionalInfo: string;
    setAdditionalInfo: (info: string) => void;
    isGenerating: boolean;
    isGenerated: boolean;
}

const PreferencesTab = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedInterests,
    setSelectedInterests,
    additionalInfo,
    setAdditionalInfo,
    setIsGenerating,
    setIsGenerated,
    setActiveTab,
    isGenerating
}: PreferencesTabProps) => {
    const handleInterestToggle = (interest: ActivityType) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsGenerated(true);
        setIsGenerating(false);

        // Switch to activities tab after generation
        setActiveTab("activities");
    };

    return (
        <TabsContent value="preferences">
            <div className="bg-card rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-4">Tell us about your trip</h2>
                <p className="text-muted-foreground mb-6">
                    Provide details about your upcoming trip to receive a personalized itinerary.
                </p>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PPP") : "Select a start date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date as Date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : "Select an end date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={(date) => setEndDate(date as Date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Interest Selection */}
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium">Interest & Activities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {activityTypes.map((activity) => (
                            <Button
                                key={activity.id}
                                variant="outline"
                                className={cn(
                                    "h-24 flex flex-col items-center justify-center gap-2",
                                    selectedInterests.includes(activity.id) &&
                                        "border-primary border-[3px]"
                                )}
                                onClick={() => handleInterestToggle(activity.id)}
                            >
                                <span className="text-2xl">{activity.icon}</span>
                                <span>{activity.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium">Additional Information (Optional)</h3>
                    <Textarea
                        placeholder="Tell us more about your preferences, any specific places you want to visit, dietary restrictions, etc."
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>

                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleGenerate}
                    disabled={
                        isGenerating || !startDate || !endDate || selectedInterests.length === 0
                    }
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        "Generate AI Recommendation"
                    )}
                </Button>
            </div>
        </TabsContent>
    );
};

export default PreferencesTab;
