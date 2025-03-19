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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditTourGuideModal } from "./EditTourGuideModal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import tourGuides, { TourGuide } from "@/data/tour-guides";

const ITEMS_PER_PAGE = 10;

export function TourGuidesTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingGuide, setEditingGuide] = useState<TourGuide | null>(null);
    const [deletingGuide, setDeletingGuide] = useState<TourGuide | null>(null);

    const handleEditSubmit = (id: string, data: Omit<TourGuide, "id" | "rating">) => {
        // Handle the edit submission here
        // This is where you would typically make an API call to update the tour guide
        console.log("Editing guide:", id, data);
        toast.success("Tour guide updated successfully");
        setEditingGuide(null);
    };

    const handleDelete = (guide: TourGuide) => {
        // Handle the delete action here
        // This is where you would typically make an API call to delete the tour guide
        console.log("Deleting guide:", guide.id);
        toast.success("Tour guide deleted successfully");
        setDeletingGuide(null);
    };

    const filteredGuides = tourGuides.filter((guide) =>
        guide.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedGuides = filteredGuides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Search tour guides..."
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
                                <TableHead>Email</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Languages</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGuides.length > 0 ? (
                                paginatedGuides.map((guide) => (
                                    <TableRow key={guide.id}>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={guide.avatar} />
                                                <AvatarFallback>
                                                    {guide.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{guide.name}</TableCell>
                                        <TableCell>{guide.email}</TableCell>
                                        <TableCell>(+63) {guide.phoneNumber}</TableCell>
                                        <TableCell>{guide.specialization}</TableCell>
                                        <TableCell>{guide.languages.join(", ")}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <span className="text-yellow-500">★</span>
                                                <span className="ml-1">{guide.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setEditingGuide(guide)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeletingGuide(guide)}
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
                                        No guides found
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
            </div>

            {editingGuide && (
                <EditTourGuideModal
                    isOpen={true}
                    onClose={() => setEditingGuide(null)}
                    onSubmit={handleEditSubmit}
                    tourGuide={editingGuide}
                />
            )}

            <AlertDialog open={!!deletingGuide} onOpenChange={() => setDeletingGuide(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this tour guide? This action cannot be
                            undone. This will permanently delete the tour guide and remove their
                            data from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deletingGuide && handleDelete(deletingGuide)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
