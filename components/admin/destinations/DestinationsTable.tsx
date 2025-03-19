"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Destination = {
    id: string;
    name: string;
    description: string;
    location: string;
    category: string;
    status: "Active" | "Inactive" | "Under Maintenance";
};

const ITEMS_PER_PAGE = 10;

export function DestinationsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data - replace with actual API call
    const destinations: Destination[] = [
        {
            id: "1",
            name: "Bon Bon Beach",
            description: "Romblon's white sand beach",
            location: "Brgy. Lonos, Romblon, Romblon",
            category: "Beach",
            status: "Active"
        }
        // Add more mock data as needed
    ];

    const filteredDestinations = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDestinations = filteredDestinations.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedDestinations.map((destination) => (
                            <TableRow key={destination.id}>
                                <TableCell>{destination.name}</TableCell>
                                <TableCell>{destination.description}</TableCell>
                                <TableCell>{destination.location}</TableCell>
                                <TableCell>{destination.category}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                            destination.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : destination.status === "Inactive"
                                                ? "bg-gray-100 text-gray-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {destination.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
