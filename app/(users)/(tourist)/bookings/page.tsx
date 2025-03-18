"use client";

import { useState } from "react";
import bookings from "@/data/bookings";
import BookingFilter from "@/components/common/booking-filter";
import BookingCard from "@/components/common/booking-card";

import { Drawer } from "@/components/ui/drawer";
import { BookingDetailsModal } from "@/components/tourist/booking-details-modal";
import { toast } from "sonner";

export default function BookingsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date");
    const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null);

    // Filter and sort bookings
    const filteredBookings = bookings
        .filter((booking) => {
            const matchesSearch = booking.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "date") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return 0;
        });

    const handleCancelBooking = (bookingId: string, reason: string) => {
        console.log(bookingId, reason);

        // TODO: Add API call to cancel booking using a custom hook
        toast.success("Booking cancelled successfully");
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

            <BookingFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Bookings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        onCancel={handleCancelBooking}
                        onViewDetails={() => setSelectedBooking(booking)}
                        selectedBooking={selectedBooking}
                    />
                ))}
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <Drawer>
                    <BookingDetailsModal
                        isOpen={true}
                        onClose={() => setSelectedBooking(null)}
                        booking={selectedBooking}
                    />
                </Drawer>
            )}
        </div>
    );
}
