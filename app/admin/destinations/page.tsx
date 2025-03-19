"use client";

import { useState } from "react";
import { DestinationsTable } from "@/components/admin/destinations/DestinationsTable";
import { AddDestinationModal } from "@/components/admin/destinations/AddDestinationModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DestinationFormData {
    name: string;
    description: string;
    location: string;
    category: string;
    status: "Active" | "Inactive" | "Under Maintenance";
}

export default function DestinationsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddDestination = (data: DestinationFormData) => {
        // TODO: Implement API call to add destination
        console.log("Adding destination:", data);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Destinations</h1>
                    <p className="text-sm text-gray-500">Manage your destinations here.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Destination
                </Button>
            </div>
            <DestinationsTable />
            <AddDestinationModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddDestination}
            />
        </div>
    );
}
