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
import { events } from "@/data/events";
import Image from "next/image";
import { EditEventModal } from "./EditEventModal";
import { DeleteEventDialog } from "./DeleteEventDialog";
import { Event } from "@/data/events";

const ITEMS_PER_PAGE = 10;

export function EventsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleEdit = (event: (typeof events)[0]) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const handleDelete = (event: (typeof events)[0]) => {
        setSelectedEvent(event);
        setIsDeleteDialogOpen(true);
    };

    const handleUpdateEvent = (id: string, data: Omit<Event, "id" | "imgUrl">) => {
        // TODO: Implement update event logic
        console.log("Updating event:", id, data);
    };

    const handleDeleteEvent = () => {
        if (selectedEvent) {
            // TODO: Implement delete event logic
            console.log("Deleting event:", selectedEvent.id);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    placeholder="Search events..."
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
                            <TableHead>Description</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEvents.length > 0 ? (
                            paginatedEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>
                                        <Image
                                            src={event.imgUrl}
                                            alt={event.title}
                                            width={100}
                                            height={100}
                                            className="h-20 w-40 rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.status}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-blue-100 text-slate-800`}
                                        >
                                            {event.category}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(event)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(event)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-10 text-center">
                                    No events found
                                </TableCell>
                            </TableRow>
                        )}
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

            {selectedEvent && (
                <>
                    <EditEventModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedEvent(null);
                        }}
                        onSubmit={handleUpdateEvent}
                        event={selectedEvent}
                    />
                    <DeleteEventDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={() => {
                            setIsDeleteDialogOpen(false);
                            setSelectedEvent(null);
                        }}
                        onConfirm={handleDeleteEvent}
                        eventTitle={selectedEvent.title}
                    />
                </>
            )}
        </div>
    );
}
