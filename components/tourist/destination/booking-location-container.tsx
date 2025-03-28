"use client";

import React, { useState } from "react";
import { BookingModal } from "./booking-modal";
import { DrawerTrigger } from "@/components/ui/drawer";
import MapDrawer from "../map-drawer";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import tourGuides from "@/data/tour-guides";
import MiniMap from "../mini-map";
import { Destination } from "@/types/types";

const BookingLocationContainer = ({ destination }: { destination: Destination }) => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <>
            <div className="space-y-8">
                {/* Book Your Visit */}
                <section className="rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-6">Book Your Visit</h2>
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setIsBookingModalOpen(true)}
                    >
                        Book Now
                    </Button>
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="h-6 w-6" />
                                Opening Hours
                            </div>
                            <span>{destination.openingHours}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Users className="h-6 w-6" />
                                Available Guides
                            </div>
                            <span>{tourGuides.length}</span>
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className="rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">Location</h2>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                        <MiniMap
                            latitude={destination.coordinates.lat}
                            longitude={destination.coordinates.lng}
                            width={700}
                            height={400}
                            zoom={14}
                            markerColor="red"
                        />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                        {destination.coordinates.lat}° N, {destination.coordinates.lng}° E
                    </p>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="w-full">
                                Get Directions
                            </Button>
                        </DrawerTrigger>
                        <MapDrawer
                            title={destination.name}
                            location={destination.location}
                            coordinates={destination.coordinates}
                        />
                    </Drawer>
                </section>
            </div>
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                destination={destination}
            />
        </>
    );
};

export default BookingLocationContainer;
