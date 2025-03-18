import { Booking } from "@/types/types";

// Sample booking data with tour guide information
const bookings: Booking[] = [
    {
        id: "1",
        title: "Bonbon Beach",
        location: "Brgy. Lonos, Sitio Lusod Romblon, Romblon",
        date: "February 15, 2025",
        time: "10:00 AM",
        numberOfPeople: 4,
        image: "/images/destinations/bonbon.jpg",
        status: "cancelled",
        tourGuide: {
            id: "1",
            name: "Juan Santos",
            rating: 4.1,
            avatar: "/"
        },
        coordinates: {
            lat: 12.572318383794148,
            lng: 122.24815440698444
        },
        tourist: {
            id: "1",
            name: "Sophia Lee",
            country: "China",
            avatar: "/"
        },
        specialRequests: "No special requests"
    },
    {
        id: "2",
        title: "Fuerza San Andres",
        location: "Brgy. 2 Romblon, Romblon",
        date: "March 02, 2025",
        time: "11:00 AM",
        numberOfPeople: 2,
        image: "/images/destinations/fuerza.jpg",
        status: "confirmed",
        tourGuide: {
            id: "1",
            name: "Juan Santos",
            rating: 4.1,
            avatar: "/"
        },
        coordinates: {
            lat: 12.578799847805477,
            lng: 122.27029422021496
        },
        tourist: {
            id: "1",
            name: "John Doe",
            country: "United States",
            avatar: "/"
        },
        specialRequests: "Would like to get a drone view of the site."
    },
    {
        id: "3",
        title: "Tiamban Beach",
        location: "Brgy. Lonos Romblon, Romblon",
        date: "March 12, 2025",
        time: "2:00 PM",
        numberOfPeople: 7,
        image: "/images/destinations/tiamban.jpg",
        status: "pending",
        tourGuide: {
            id: "1",
            name: "Juan Santos",
            rating: 4.1,
            avatar: "/"
        },
        coordinates: {
            lat: 12.572318383794148,
            lng: 122.24815440698444
        },
        tourist: {
            id: "2",
            name: "Cathleen Lim",
            country: "Philippines",
            avatar: "/"
        },
        specialRequests: "No special requests"
    },
    {
        id: "4",
        title: "Kipot River",
        location: "Brgy. Sablayan Romblon, Romblon",
        date: "March 04, 2025",
        time: "1:00 PM",
        numberOfPeople: 10,
        image: "/images/destinations/kipot.jpg",
        status: "completed",
        tourGuide: {
            id: "1",
            name: "Juan Santos",
            rating: 4.1,
            avatar: "/"
        },
        coordinates: {
            lat: 12.572318383794148,
            lng: 122.24815440698444
        },
        tourist: {
            id: "3",
            name: "James Bond",
            country: "United Kingdom",
            avatar: "/"
        },
        specialRequests: "No special requests"
    }
];

export default bookings;
