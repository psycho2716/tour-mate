import { ActivityType, Destination, User } from "@/types/types";

const activityTypes: { id: ActivityType; label: string; icon: string }[] = [
    { id: "cultural", label: "Cultural", icon: "🏛️" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "nightlife", label: "Nightlife", icon: "🎵" },
    { id: "beach", label: "Beach", icon: "🏖️" },
    { id: "nature", label: "Nature", icon: "⛰️" },
    { id: "adventure", label: "Adventure", icon: "🚴" },
    { id: "relaxation", label: "Relaxation", icon: "🧘" },
    { id: "food", label: "Food & Dining", icon: "🍽️" }
];

// About Us Image url will be updated later
export const aboutUsImage = "/about-us.jpg";

const destinations: Destination[] = [
    {
        id: 1,
        name: "Fuerza San Andres",
        location: "Brgy. 2, Romblon, Romblon",
        description:
            "The Twin Forts of Romblon are a pair of Spanish fortifications located in the town of Romblon, Romblon in the Philippines.",
        image: "/images/destinations/fuerza.jpg",
        rating: 4.8,
        guides: 4,
        category: "landmark",
        openingHours: "9:00 AM - 5:00 PM",
        keywords: ["fort", "spanish", "colonial", "history", "romblon"],
        coordinates: {
            lat: 12.578737019901709,
            lng: 122.27035859323206
        },
        priceRange: "50-500"
    },
    {
        id: 2,
        name: "Bonbon Beach",
        location: "Brgy. Lonos, Romblon, Romblon",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati doloremque sint labore laborum perferendis delectus inventore a hic iste vitae.",
        image: "/images/destinations/bonbon.jpg",
        rating: 4.8,
        guides: 4,
        category: "beach",
        openingHours: "7:00 AM - 5:00 PM",
        keywords: [
            "beach",
            "romblon",
            "romblon beach",
            "romblon beach resort",
            "romblon beach hotel"
        ],
        coordinates: {
            lat: 12.578737019901709,
            lng: 122.27035859323206
        },
        priceRange: "50-500"
    },
    {
        id: 3,
        name: "Fuerza San Andres",
        location: "Brgy. 2, Romblon, Romblon",
        description:
            "The Twin Forts of Romblon are a pair of Spanish fortifications located in the town of Romblon, Romblon in the Philippines.",
        image: "/images/destinations/fuerza.jpg",
        rating: 4.8,
        guides: 4,
        category: "landmark",
        openingHours: "9:00 AM - 5:00 PM",
        keywords: ["fort", "spanish", "colonial", "history", "romblon"],
        coordinates: {
            lat: 12.578737019901709,
            lng: 122.27035859323206
        },
        priceRange: "50-500"
    }
];

const users: User[] = [
    {
        id: 1,
        type: "tourist",
        avatar: "/images/profile.jpg",
        name: "John Doe",
        password: "john123",
        email: "john@gmail.com",
        phoneNumber: "09123456789",
        lastBookedLocation: {
            id: 1,
            name: "Fuerza San Andres",
            location: "Brgy. 2, Romblon, Romblon",
            description:
                "The Twin Forts of Romblon are a pair of Spanish fortifications located in the town of Romblon, Romblon in the Philippines.",
            image: "/images/destinations/fuerza.jpg",
            rating: 4.8,
            guides: 4,
            category: "landmark",
            openingHours: "9:00 AM - 5:00 PM",
            keywords: ["fort", "spanish", "colonial", "history", "romblon"],
            coordinates: {
                lat: 12.578737019901709,
                lng: 122.27035859323206
            },
            priceRange: "50-500"
        },
        lastActive: "2024-01-01"
    },
    {
        id: 2,
        type: "tour-guide",
        avatar: "/images/profile.jpg",
        name: "Jane Smith",
        password: "jane123",
        email: "jane@gmail.com",
        phoneNumber: "09123456789",
        lastBookedLocation: null,
        lastActive: "2024-01-01"
    },
    {
        id: 3,
        type: "admin",
        avatar: "/images/profile.jpg",
        name: "James Bond",
        password: "james123",
        email: "james@gmail.com",
        phoneNumber: null,
        lastBookedLocation: null,
        lastActive: "2024-01-01"
    }
];

export { activityTypes, destinations, users };
