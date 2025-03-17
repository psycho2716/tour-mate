export type Destination = {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    guides: number;
    category: "landmark" | "beach" | "mountain" | "city" | "historical";
    keywords: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
};

export const destinations: Destination[] = [
    {
        id: 1,
        name: "Fuerza San Andres",
        location: "Brgy. 2, Romblon, Romblon",
        description:
            "The Twin Forts of Romblon are a pair of Spanish fortifications located in the town of Romblon, Romblon in the Philippines.",
        image: "/images/destinations/fuerza.jpg",
        rating: 4.8,
        guides: 4,
        category: "historical",
        keywords: ["fort", "spanish", "colonial", "history", "romblon"],
        coordinates: {
            lat: 12.578737019901709,
            lng: 122.27035859323206
        }
    }
];
