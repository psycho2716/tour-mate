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
import { Pencil, Trash2, Star } from "lucide-react";
import { destinations, Destination } from "@/data/destinations";
import Image from "next/image";
import { DeleteDestinationDialog } from "./DeleteDestinationDialog";
import { EditDestinationModal } from "./EditDestinationModal";

const ITEMS_PER_PAGE = 10;

export function DestinationsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[0] | null>(
        null
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const filteredDestinations = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDestinations = filteredDestinations.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const handleEdit = (destination: (typeof destinations)[0]) => {
        setSelectedDestination(destination);
        setIsEditModalOpen(true);
    };

    const handleDelete = (destination: (typeof destinations)[0]) => {
        setSelectedDestination(destination);
        setIsDeleteDialogOpen(true);
    };

    const handleUpdateDestination = (id: string, data: Omit<Destination, "id" | "imgUrl">) => {
        // TODO: Implement update destination logic
        console.log("Updating destination:", id, data);
    };

    const handleDeleteDestination = () => {
        if (selectedDestination) {
            // TODO: Implement delete destination logic
            console.log("Deleting destination:", selectedDestination.id);
        }
    };

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
                            <TableHead></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Keywords</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Opening Hours</TableHead>
                            <TableHead>Closing Hours</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedDestinations.map((destination) => (
                            <TableRow key={destination.id}>
                                <TableCell>
                                    <Image
                                        src={destination.imgUrl}
                                        alt={destination.name}
                                        width={100}
                                        height={100}
                                        className="h-20 w-40 rounded-md object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{destination.name}</TableCell>
                                <TableCell>{destination.location}</TableCell>
                                <TableCell>
                                    <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-blue-100 text-slate-800">
                                        {destination.category}
                                    </span>
                                </TableCell>
                                <TableCell>{destination.keywords.join(", ")}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center">
                                        {destination.rating}
                                        <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    </span>
                                </TableCell>
                                <TableCell>{destination.openingHours}</TableCell>
                                <TableCell>{destination.closingHours}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(destination)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(destination)}
                                        >
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

            {selectedDestination && (
                <>
                    <EditDestinationModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedDestination(null);
                        }}
                        onSubmit={handleUpdateDestination}
                        destination={selectedDestination}
                    />
                    <DeleteDestinationDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={() => {
                            setIsDeleteDialogOpen(false);
                            setSelectedDestination(null);
                        }}
                        onConfirm={handleDeleteDestination}
                        destinationName={selectedDestination.name}
                    />
                </>
            )}
        </div>
    );
}
