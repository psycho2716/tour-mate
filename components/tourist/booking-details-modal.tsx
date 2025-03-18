"use client";

import { Check, CheckCircle, Clock, XCircle } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MiniMap from "@/components/tourist/mini-map";
import { Button } from "../ui/button";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import MapDrawer from "./map-drawer";

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
}

export function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
    return (
        <>
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
                                <p className="font-medium">{booking.people}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Additional Details */}
                    <div className="space-y-6">
                        {/* T Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Tour Guide</h3>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={booking.tourGuide.image} />
                                    <AvatarFallback>
                                        {booking.tourGuide.name.charAt(0)}
                                    </AvatarFallback>
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
        </>
    );
}
