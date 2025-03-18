"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";

interface RejectBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleRejectBooking: (id: string, reason: string) => void;
    bookingId: string;
}

export function RejectBookingModal({
    isOpen,
    onClose,
    handleRejectBooking,
    bookingId
}: RejectBookingModalProps) {
    const [reason, setReason] = useState("");

    const handleConfirm = () => {
        handleRejectBooking(bookingId, reason);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Reject Booking"
            description="Are you sure you want to reject this booking? This action cannot be undone."
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
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
