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
        }
    }
];

const users: User[] = [
    {
        id: 1,
        type: "tourist",
        image: "/images/users/john.jpg",
        name: "John Doe",
        password: "john123",
        email: "john@gmail.com"
    },
    {
        id: 2,
        type: "tour-guide",
        image: "/images/users/jane.jpg",
        name: "Jane Smith",
        password: "jane123",
        email: "jane@gmail.com"
    },
    {
        id: 3,
        type: "admin",
        image: "/images/users/james.jpg",
        name: "James Bond",
        password: "james123",
        email: "james@gmail.com"
    }
];

export { activityTypes, destinations, users };
