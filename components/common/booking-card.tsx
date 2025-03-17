import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Booking } from "@/components/tourist/booking-details-modal";

const BookingCard = ({
    booking,
    setSelectedBooking
}: {
    booking: Booking;
    setSelectedBooking: (booking: Booking) => void;
}) => {
    const handleCancel = (id: number) => {
        console.log(id);
    };

    const handleViewDetails = (booking: Booking) => {
        setSelectedBooking(booking);
    };

    return (
        <div key={booking.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
            <div className="relative h-48">
                <Image src={booking.image} alt={booking.title} fill className="object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{booking.title}</h3>
                <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                        <MapPin size={20} />
                        {booking.location}
                    </p>
                    <p className="flex items-center gap-2">
                        <Calendar size={20} />
                        {booking.date}
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock size={20} />
                        {booking.time}
                    </p>
                    <p className="flex items-center gap-2">
                        <Users size={20} />
                        {booking.people} people
                    </p>
                </div>
                <div className="mt-4 flex gap-3">
                    <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() => handleViewDetails(booking)}
                    >
                        View Details
                    </Button>

                    {booking.status === "pending" || booking.status === "confirmed" ? (
                        <Button
                            className="flex-1"
                            variant="destructive"
                            onClick={() => handleCancel(booking.id)}
                        >
                            Cancel
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
