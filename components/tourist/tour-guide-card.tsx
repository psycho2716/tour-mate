"use client";

import { TourGuide } from "@/data/tour-guides";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { Destination } from "@/types/types";
import { BookingModal } from "./booking-modal";

interface TourGuideCardProps {
    guide: TourGuide;
    destination: Destination;
}

const TourGuideCard = ({ guide, destination }: TourGuideCardProps) => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <>
            <div
                className="flex items-center justify-between p-4 rounded-lg border cursor-pointer"
                onClick={() => setIsBookingModalOpen(true)}
            >
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={guide.avatar} alt={guide.name} />
                        <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-medium">{guide.name}</h3>
                        <p className="text-sm text-muted-foreground">{guide.specialization}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{guide.rating}</span>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                destination={destination}
            />
        </>
    );
};

export default TourGuideCard;
