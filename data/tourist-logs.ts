import { TouristLog } from "@/types/types";

export const touristLogs: TouristLog[] = [
    {
        id: 1,
        touristId: 1,
        touristName: "John Doe",
        destination: {
            id: 1,
            name: "Fuerza San Andres",
            location: "Brgy. 2, Romblon, Romblon"
        },
        bookingDate: "2024-01-15",
        lastActive: "2024-01-15"
    },
    {
        id: 2,
        touristId: 2,
        touristName: "Maria Garcia",
        destination: {
            id: 2,
            name: "Bonbon Beach",
            location: "Brgy. Lonos, Romblon, Romblon"
        },
        bookingDate: "2024-01-20",
        lastActive: "2024-01-20"
    },
    {
        id: 3,
        touristId: 3,
        touristName: "David Wilson",
        destination: {
            id: 3,
            name: "Tiamban Beach",
            location: "Brgy. Tiamban, Romblon, Romblon"
        },
        bookingDate: "2024-01-25",
        lastActive: "2024-01-25"
    }
];
