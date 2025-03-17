"use client";

import { Check, CheckCircle, Clock, XCircle } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MiniMap from "@/components/tourist/mini-map";
import { Button } from "../ui/button";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Car, MapPin } from "lucide-react";
import MapDrawer from "./map-drawer";

export interface Booking {
    id: number;
    title: string;
    location: string;
    date: string;
    time: string;
    people: number;
    image: string;
    status: string;
    tourGuide: {
        name: string;
        rating: number;
        image: string;
    };
    coordinates?: {
        lat: number;
        lng: number;
    };
    specialRequests?: string;
}

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
}

export function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle className="text-2xl font-bold">Booking Details</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Left side - Image */}
                        <div className="w-full flex flex-col gap-4">
                            <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden">
                                <Image
                                    src={booking.image}
                                    alt={booking.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Bottom section - Booking details */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold -mb-4">{booking.title}</h2>
                                <p className="text-gray-600">{booking.location}</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="w-full flex items-center justify-between gap-2 pb-4 border-b-[1px] border-gray-200">
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

                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-gray-700">Date:</p>
                                        <p className="font-medium">{booking.date}</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-gray-700">Time:</p>
                                        <p className="font-medium">{booking.time}</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-gray-700">Number of People:</p>
                                        <p className="font-medium">{booking.people}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Details */}
                        <div className="space-y-6">
                            {/* Tour Guide Section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tour Guide</h3>
                                <div className="flex items-center gap-3">
                                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                        <Avatar>
                                            <AvatarImage src={booking.tourGuide.image} />
                                            <AvatarFallback>
                                                {booking.tourGuide.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
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
                                <h3 className="text-lg font-semibold mb-2">Special Requests</h3>
                                <p className="text-gray-600">
                                    {booking.specialRequests || "No special requests."}
                                </p>
                            </div>

                            {/* Show a map when the booking status is confirmed */}
                            {booking.status === "confirmed" && booking.coordinates && (
                                <div className="w-full space-y-2">
                                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                                    <MiniMap
                                        latitude={booking.coordinates.lat}
                                        longitude={booking.coordinates.lng}
                                        width={400}
                                        height={200}
                                        zoom={14}
                                        markerColor="red"
                                    />
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button variant="outline" className="w-full rounded">
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
                </DialogContent>
            </Dialog>
        </>
    );
}
