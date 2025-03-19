"use client";

import { Check, CheckCircle, Clock, XCircle } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MiniMap from "@/components/tourist/mini-map";
import { Button } from "../ui/button";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import MapDrawer from "./map-drawer";
import { Booking } from "@/types/types";
import { useState } from "react";

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
    onRateDestination?: (rating: number) => void;
    onRateTourGuide?: (rating: number) => void;
}

export function BookingDetailsModal({
    isOpen,
    onClose,
    booking,
    onRateDestination,
    onRateTourGuide
}: BookingDetailsModalProps) {
    const [destinationRating, setDestinationRating] = useState<number>(0);
    const [tourGuideRating, setTourGuideRating] = useState<number>(0);
    const [hoveredDestinationStar, setHoveredDestinationStar] = useState<number>(0);
    const [hoveredTourGuideStar, setHoveredTourGuideStar] = useState<number>(0);

    const renderStarRating = (
        rating: number,
        hoverRating: number,
        onRate: (rating: number) => void,
        onHover: (rating: number) => void
    ) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className="focus:outline-none"
                        onClick={() => onRate(star)}
                        onMouseEnter={() => onHover(star)}
                        onMouseLeave={() => onHover(0)}
                    >
                        <svg
                            className={`w-7 h-7 ${
                                star <= (hoverRating || rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            } transition-colors`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.9187 9.02295C15.0526 9.43192 15.4365 9.70712 15.8697 9.70712H22.2371C23.2058 9.70712 23.6086 10.9463 22.8249 11.5228L17.6736 15.2962C17.3231 15.5545 17.1764 16.0034 17.3103 16.4124L19.2779 22.5083C19.5773 23.4296 18.5228 24.198 17.7391 23.6215L12.5878 19.8481C12.2373 19.5898 11.7627 19.5898 11.4122 19.8481L6.2609 23.6215C5.47719 24.198 4.42271 23.4296 4.72206 22.5083L6.68969 16.4124C6.82356 16.0034 6.67685 15.5545 6.32637 15.2962L1.17505 11.5228C0.391347 10.9463 0.794178 9.70712 1.76289 9.70712H8.13026C8.56349 9.70712 8.94744 9.43192 9.08132 9.02295L11.0489 2.92705Z" />
                        </svg>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Booking Details" size="2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Image and Basic Details */}
                <div className="space-y-6">
                    <div className="relative h-[250px] rounded-lg overflow-hidden">
                        <Image
                            src={booking.image}
                            alt={booking.title}
                            width={300}
                            height={500}
                            className="object-cover h-full w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-2">{booking.title}</h2>
                        <p className="text-gray-600">{booking.location}</p>
                    </div>

                    {booking.status === "completed" && (
                        <div className="space-y-4 p-2 bg-gray-50 rounded-lg">
                            <div className="space-y-2">
                                <h3 className="font-medium">Rate Destination</h3>
                                {renderStarRating(
                                    destinationRating,
                                    hoveredDestinationStar,
                                    (rating) => {
                                        setDestinationRating(rating);
                                        onRateDestination?.(rating);
                                    },
                                    setHoveredDestinationStar
                                )}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-200">
                            <p className="text-gray-700">Status:</p>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize
                                    ${
                                        booking.status === "cancelled"
                                            ? "bg-red-100 text-red-800"
                                            : booking.status === "completed"
                                            ? "bg-blue-100 text-blue-800"
                                            : booking.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                    }`}
                                >
                                    {booking.status === "cancelled" ? (
                                        <XCircle className="w-[14px] h-[14px] mr-1" />
                                    ) : booking.status === "completed" ? (
                                        <Check className="w-[14px] h-[14px] mr-1" />
                                    ) : booking.status === "pending" ? (
                                        <Clock className="w-[14px] h-[14px] mr-1" />
                                    ) : (
                                        <CheckCircle className="w-[14px] h-[14px] mr-1" />
                                    )}
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">Date:</p>
                            <p className="font-medium">{booking.date}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">Time:</p>
                            <p className="font-medium">{booking.time}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">Number of People:</p>
                            <p className="font-medium">{booking.numberOfPeople}</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Additional Details */}
                <div className="space-y-6">
                    {/* Tour Guide Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Tour Guide</h3>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={booking.tourGuide.avatar} />
                                <AvatarFallback>{booking.tourGuide.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{booking.tourGuide.name}</p>
                                <p className="text-sm text-gray-500">
                                    Rating: {booking.tourGuide.rating}/5
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Special Requests Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Special Requests</h3>
                        <p className="text-muted-foreground text-sm">
                            {booking.specialRequests || "No special requests."}
                        </p>
                    </div>

                    {booking.status === "completed" && (
                        <div className="mt-3 space-y-2">
                            <h4 className="font-medium">Rate Tour Guide</h4>
                            {renderStarRating(
                                tourGuideRating,
                                hoveredTourGuideStar,
                                (rating) => {
                                    setTourGuideRating(rating);
                                    onRateTourGuide?.(rating);
                                },
                                setHoveredTourGuideStar
                            )}
                        </div>
                    )}

                    {/* Location Section */}
                    {booking.status === "confirmed" && booking.coordinates && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Location</h3>
                            <div className="rounded-lg overflow-hidden">
                                <MiniMap
                                    latitude={booking.coordinates.lat}
                                    longitude={booking.coordinates.lng}
                                    width={400}
                                    height={200}
                                    zoom={14}
                                    markerColor="red"
                                />
                            </div>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        Get Directions
                                    </Button>
                                </DrawerTrigger>
                                <MapDrawer
                                    title={booking.title}
                                    location={booking.location}
                                    coordinates={booking.coordinates}
                                />
                            </Drawer>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
