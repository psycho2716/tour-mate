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

type TouristLog = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    lastBookedLocation: string;
    lastActive: string;
};

const ITEMS_PER_PAGE = 10;

export function TouristLogsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data - replace with actual API call
    const touristLogs: TouristLog[] = [
        {
            id: "1",
            name: "James Doe",
            email: "james_d@gmail.com",
            phoneNumber: "(63) 92788726442",
            lastBookedLocation: "Bon Bon Beach",
            lastActive: "2025-09-24"
        }
        // Add more mock data as needed
    ];

    const filteredLogs = touristLogs.filter((log) =>
        log.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    placeholder="Search tourists..."
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
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Last Booked Location</TableHead>
                            <TableHead>Last Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.name}</TableCell>
                                <TableCell>{log.email}</TableCell>
                                <TableCell>{log.phoneNumber}</TableCell>
                                <TableCell>{log.lastBookedLocation}</TableCell>
                                <TableCell>{log.lastActive}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
