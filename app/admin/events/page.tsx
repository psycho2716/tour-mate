"use client";

import { useState } from "react";
import { EventsTable } from "@/components/admin/events/EventsTable";
import { AddEventModal } from "@/components/admin/events/AddEventModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EventsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddEvent = (data: any) => {
        // TODO: Implement API call to add event
        console.log("Adding event:", data);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Events</h1>
                    <p className="text-sm text-gray-500">Manage your events here.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                </Button>
            </div>
            <EventsTable />
            <AddEventModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddEvent}
            />
        </div>
    );
}
