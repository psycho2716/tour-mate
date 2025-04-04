import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NumberInput } from "@/components/ui/number-input";
import { Activity } from "@/types/types";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import tourGuides from "@/data/tour-guides";

interface ActivityBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    startDate: Date | undefined;
    endDate: Date | undefined;
    activities: Activity[];
}

export function ActivityBookingModal({
    isOpen,
    onClose,
    startDate,
    endDate,
    activities
}: ActivityBookingModalProps) {
    const [selectedTourGuide, setSelectedTourGuide] = useState<string>();
    const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
    const [specialRequests, setSpecialRequests] = useState<string>("");
    const [selectedActivities, setSelectedActivities] = useState<string[]>(
        activities.map((activity) => activity.id)
    );

    const handleActivityToggle = (activityId: string) => {
        if (selectedActivities.includes(activityId)) {
            setSelectedActivities(selectedActivities.filter((id) => id !== activityId));
        } else {
            setSelectedActivities([...selectedActivities, activityId]);
        }
    };

    const handleBookNow = () => {
        if (!selectedTourGuide || selectedActivities.length === 0) {
            toast.error("Please select a tour guide and at least one activity");
            return;
        }

        // Log booking data
        console.log({
            tourGuide: selectedTourGuide,
            activities: selectedActivities,
            startDate,
            endDate,
            numberOfPeople,
            specialRequests
        });

        toast.success("Tour booked successfully!", {
            description: "Your tour has been booked. You'll receive a confirmation shortly."
        });

        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Book Your Tour Package"
            description="Book all your planned activities with a tour guide"
            size="xl"
        >
            <div className="space-y-6">
                {/* Tour Guide Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tour Guide</label>
                    <Select value={selectedTourGuide} onValueChange={setSelectedTourGuide}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a tour guide" />
                        </SelectTrigger>
                        <SelectContent>
                            {tourGuides.map((guide) => (
                                <SelectItem key={guide.id} value={guide.id}>
                                    {guide.name} - {guide.specialization} ({guide.rating}/5)
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Date Range (non-editable) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <div className="p-3 border rounded-md bg-gray-50">
                            {startDate ? format(startDate, "PPP") : "Not selected"}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <div className="p-3 border rounded-md bg-gray-50">
                            {endDate ? format(endDate, "PPP") : "Not selected"}
                        </div>
                    </div>
                </div>

                {/* Activities Selector */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Activities to Book</label>
                    <Card className="border border-gray-200">
                        <CardContent className="pt-6 space-y-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3">
                                    <Checkbox
                                        id={`activity-${activity.id}`}
                                        checked={selectedActivities.includes(activity.id)}
                                        onCheckedChange={() => handleActivityToggle(activity.id)}
                                    />
                                    <div className="space-y-1">
                                        <label
                                            htmlFor={`activity-${activity.id}`}
                                            className="font-medium cursor-pointer"
                                        >
                                            {activity.name}
                                        </label>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.time} - {activity.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Number of People */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Number of People</label>
                    <NumberInput
                        placeholder="Enter number of people (max 20)"
                        max={20}
                        min={1}
                        value={numberOfPeople}
                        onChange={(value) => setNumberOfPeople(value)}
                    />
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Special Requests (Optional)</label>
                    <Textarea
                        placeholder="Any special requirements or requests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                </div>

                {/* Total Price (simple implementation) */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Activities</span>
                        <span className="font-medium">{selectedActivities.length} selected</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Number of People</span>
                        <span className="font-medium">{numberOfPeople}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="w-full" onClick={handleBookNow}>
                        Book Now
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
