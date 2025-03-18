"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleConfirmBooking: (id: string) => void;
    bookingId: string;
}

export function ConfirmBookingModal({
    isOpen,
    onClose,
    handleConfirmBooking,
    bookingId
}: ConfirmBookingModalProps) {
    const handleConfirm = () => {
        handleConfirmBooking(bookingId);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Booking"
            description="Please confirm that you want to proceed with this booking. This action cannot be
                    undone."
            size="lg"
        >
            <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={onClose} className="min-w-[120px]">
                    Cancel
                </Button>
                <Button
                    variant="default"
                    onClick={handleConfirm}
                    className="min-w-[120px] bg-green-600 hover:bg-green-700"
                >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}
