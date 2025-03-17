import { Booking } from "@/components/tourist/booking-details-modal";

// Sample booking data with tour guide information
const bookings: Booking[] = [
    {
        id: 1,
        title: "Bonbon Beach",
        location: "Brgy. Lonos, Sitio Lusod Romblon, Romblon",
        date: "February 15, 2025",
        time: "10:00 AM",
        people: 4,
        image: "/images/destinations/bonbon.jpg",
        status: "cancelled",
        tourGuide: {
            name: "Juan Santos",
            rating: 4.1,
            image: "/"
        },
        specialRequests: "No special requests"
    },
    {
        id: 2,
        title: "Fuerza San Andres",
        location: "Brgy. 2 Romblon, Romblon",
        date: "March 02, 2025",
        time: "11:00 AM",
        people: 2,
        image: "/images/destinations/fuerza.jpg",
        status: "confirmed",
        tourGuide: {
            name: "Juan Santos",
            rating: 4.1,
            image: "/"
        },
        coordinates: {
            lat: 12.578799847805477,
            lng: 122.27029422021496
        },
        specialRequests: "Would like to get a drone view of the site."
    },
    {
        id: 3,
        title: "Tiamban Beach",
        location: "Brgy. Lonos Romblon, Romblon",
        date: "March 12, 2025",
        time: "2:00 PM",
        people: 7,
        image: "/images/destinations/tiamban.jpg",
        status: "pending",
        tourGuide: {
            name: "Juan Santos",
            rating: 4.1,
            image: "/"
        },
        specialRequests: "No special requests"
    },
    {
        id: 4,
        title: "Kipot River",
        location: "Brgy. Sablayan Romblon, Romblon",
        date: "March 04, 2025",
        time: "1:00 PM",
        people: 10,
        image: "/images/destinations/kipot.jpg",
        status: "completed",
        tourGuide: {
            name: "Juan Santos",
            rating: 4.1,
            image: "/"
        },
        specialRequests: "No special requests"
    }
];

export default bookings;
