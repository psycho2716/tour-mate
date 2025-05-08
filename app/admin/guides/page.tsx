"use client";

import { useState } from "react";
import { TourGuidesTable } from "@/components/admin/guides/TourGuidesTable";
import { AddTourGuideModal } from "@/components/admin/guides/AddTourGuideModal";

interface TourGuideFormData {
    name: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    languages: string[];
}

export default function TourGuidesPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddTourGuide = (data: TourGuideFormData) => {
        // TODO: Implement API call to add tour guide
        console.log("Adding tour guide:", data);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Tour Guides</h1>
                    <p className="text-sm text-gray-500">Manage tour guides here.</p>
                </div>
            </div>
            <TourGuidesTable />
            <AddTourGuideModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddTourGuide}
            />
        </div>
    );
}
