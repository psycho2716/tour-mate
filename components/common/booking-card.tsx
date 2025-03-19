"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, MessageCircleMore, Users } from "lucide-react";
import { CardComponent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookingStatus } from "@/types/types";
import { Booking } from "@/types/types";
import { CancelBookingModal } from "@/components/tourist/cancel-booking-modal";
import { RejectBookingModal } from "@/components/tour-guide/reject-booking-modal";
import { ConfirmBookingModal } from "@/components/tour-guide/confirm-booking-modal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BookingCardProps {
    selectedBooking: Booking | null;
    booking: Booking;
    onViewDetails?: (booking: Booking) => void;
    onCancel?: (id: string, reason: string) => void;
    onConfirm?: (id: string) => void;
    onReject?: (id: string, reason: string) => void;
    onMessage?: (id: string) => void;
    className?: string;
    imageHeight?: number;
}

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800" },
    completed: { label: "Completed", className: "bg-blue-100 text-blue-800" }
};

const BookingCard = ({
    booking,
    onViewDetails,
    onCancel,
    onConfirm,
    onReject,
    onMessage,
    className,
    imageHeight = 48
}: BookingCardProps) => {
    const status = statusConfig[booking.status];
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    return (
        <>
            <CardComponent
                image={{
                    src: booking.image,
                    alt: booking.title,
                    height: imageHeight
                }}
                title={booking.title}
                className={className}
                details={[
                    { icon: <MapPin size={20} />, text: booking.location },
                    { icon: <Calendar size={20} />, text: booking.date },
                    { icon: <Clock size={20} />, text: booking.time },
                    {
                        icon: <Users size={20} />,
                        text: `${booking.numberOfPeople} ${
                            booking.numberOfPeople === 1 ? "person" : "people"
                        }`
                    },
                    {
                        icon: (
                            <Avatar>
                                <AvatarImage
                                    src={booking.tourist.avatar}
                                    alt={booking.tourist.name}
                                />
                                <AvatarFallback>{booking.tourist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ),
                        text: booking.tourist.name
                    }
                ]}
                actions={
                    <div className="w-full flex items-center gap-2">
                        <span
                            className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                status.className
                            )}
                        >
                            {status.label}
                        </span>
                        {onViewDetails && (
                            <Button
                                className="flex-1"
                                variant="outline"
                                onClick={() => onViewDetails(booking)}
                            >
                                View Details
                            </Button>
                        )}
                        {onCancel &&
                            (booking.status === "pending" || booking.status === "confirmed") && (
                                <Button
                                    className="flex-1"
                                    variant="destructive"
                                    onClick={() => setShowCancelModal(true)}
                                >
                                    Cancel
                                </Button>
                            )}
                        {onConfirm && booking.status === "pending" && (
                            <Button
                                className="flex-1"
                                variant="default"
                                onClick={() => setShowConfirmModal(true)}
                            >
                                Confirm
                            </Button>
                        )}
                        {onReject && booking.status === "pending" && (
                            <Button
                                className="flex-1"
                                variant="destructive"
                                onClick={() => setShowRejectModal(true)}
                            >
                                Reject
                            </Button>
                        )}
                        {onMessage && booking.status === "confirmed" && (
                            <div className="flex items-center px-3 hover:bg-slate-100 hover:ring-1 ring-slate-300 cursor-pointer rounded-md">
                                <MessageCircleMore className="w-6 h-6 text-slate-700" />
                            </div>
                        )}
                    </div>
                }
            />

            {onCancel && (
                <CancelBookingModal
                    isOpen={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    handleCancelBooking={onCancel}
                    bookingDate={new Date(booking.date)}
                    bookingId={booking.id}
                    setShowCancelModal={setShowCancelModal}
                />
            )}

            {onConfirm && (
                <ConfirmBookingModal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    bookingId={booking.id}
                    handleConfirmBooking={onConfirm}
                />
            )}

            {onReject && (
                <RejectBookingModal
                    isOpen={showRejectModal}
                    onClose={() => setShowRejectModal(false)}
                    bookingId={booking.id}
                    handleRejectBooking={onReject}
                />
            )}
        </>
    );
};

export default BookingCard;
