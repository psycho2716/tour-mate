import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import tourGuides from "@/data/tour-guides";
import { NumberInput } from "@/components/ui/number-input";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [date, setDate] = useState<Date>();
    const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [selectedGuide, setSelectedGuide] = useState<string>("");
    const [specialRequests, setSpecialRequests] = useState<string>("");

    const handleSubmit = () => {
        // Handle form submission
        console.log({
            date,
            numberOfPeople,
            selectedTime,
            selectedGuide,
            specialRequests
        });
        // TODO: Submit to API
        onClose();
    };

    // ... rest of your existing JSX ...
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Book Your Tour"
            description="Book a guided tour of Fort San Andres"
            size="lg"
        >
            <div className="space-y-6">
                {/* Tour Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tour Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Time */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="9:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Tour Guide */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tour Guide</label>
                    <Select value={selectedGuide} onValueChange={setSelectedGuide}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a tour guide" />
                        </SelectTrigger>
                        <SelectContent>
                            {tourGuides.map((guide) => (
                                <SelectItem key={guide.id} value={guide.id}>
                                    {guide.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="w-full" onClick={handleSubmit}>
                        Book Tour
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
