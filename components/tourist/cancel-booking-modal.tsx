"use client";

import { AlertCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";

interface CancelBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleCancelBooking: (id: string, reason: string) => void;
    bookingDate: Date;
    bookingId: string;
    setShowCancelModal: (show: boolean) => void;
}

export function CancelBookingModal({
    isOpen,
    onClose,
    handleCancelBooking,
    bookingDate,
    bookingId,
    setShowCancelModal
}: CancelBookingModalProps) {
    const [reason, setReason] = useState<string>("");

    // Calculate if the booking is within 48 hours
    const isWithin48Hours = () => {
        const now = new Date();
        const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return hoursDifference <= 48;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Cancel Booking"
            description="Are you sure you want to cancel this booking? This action cannot be undone."
            size="lg"
        >
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1.5 block">
                        Reason for Cancellation (Optional)
                    </label>
                    <Textarea
                        placeholder="Please provide a reason for cancellation"
                        value={reason}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setReason(e.target.value)
                        }
                        className="resize-none"
                    />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        <div className="space-y-1">
                            <h4 className="font-medium text-amber-600">Cancellation Policy</h4>
                            <p className="text-sm text-amber-700">
                                Cancellations made more than 48 hours before the tour date will
                                receive a full refund. Cancellations made within 48 hours may be
                                subject to a cancellation fee.
                            </p>
                            {isWithin48Hours() && (
                                <p className="text-sm font-medium text-amber-700 mt-2">
                                    Note: This booking is within 48 hours of the tour date.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onClose}>
                        Go Back
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            setShowCancelModal(false);
                            handleCancelBooking(bookingId, reason);
                        }}
                    >
                        Confirm Cancellation
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
