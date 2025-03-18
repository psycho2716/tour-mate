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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    destination: Destination;
}

export function BookingModal({ isOpen, onClose, destination }: BookingModalProps) {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<string>();
    const [tourGuide, setTourGuide] = useState<string>();
    const [numberOfPeople, setNumberOfPeople] = useState<number>();
    const [specialRequests, setSpecialRequests] = useState<string>();
    const router = useRouter();

    // TODO: Implement booking logic and move to a separate custom hook
    const handleBooking = () => {
        if (!date || !time || !tourGuide || !numberOfPeople) {
            toast.error("Please fill in all fields.");
            return;
        }

        toast.success("Booking successfully!", {
            description: "Your tour has been booked successfully. Please wait for the confirmation."
        });

        // Simulate a delay before redirecting to the home page
        const timeout = setTimeout(() => {
            router.push("/home");
        }, 2000);

        // Clear the timeout if the user closes the modal
        return () => clearTimeout(timeout);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Book Your Tour"
            description={`Book a guided tour of ${destination.name}`}
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
                    <Select onValueChange={setTime} required>
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
                    <Select onValueChange={setTourGuide} required>
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
                        required
                        onChange={setNumberOfPeople}
                    />
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Special Requests (Optional)</label>
                    <Textarea
                        placeholder="Any special requirements or requests"
                        required
                        onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="w-full" onClick={handleBooking}>
                        Book Tour
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
