export type DestinationCategory =
    | "Beach"
    | "Mountain"
    | "Historical"
    | "Cultural"
    | "Adventure"
    | "Landmark"
    | "Nature";

export interface Destination {
    id: string;
    name: string;
    description: string;
    location: string;
    category: DestinationCategory;
    rating?: number;
    imgUrl: string;
    openingHours: string;
    closingHours: string;
    guides: { id: string }[];
    coordinates: {
        lat: number;
        lng: number;
    };
    keywords: string[];
}

export const destinationCategories: DestinationCategory[] = [
    "Beach",
    "Mountain",
    "Historical",
    "Cultural",
    "Adventure",
    "Nature"
];

export const destinations: Destination[] = [
    {
        id: "1",
        name: "Bonbon Beach",
        description:
            "A pristine white sand beach with crystal clear waters, perfect for swimming and snorkeling.",
        location: "Brgy. Lonos Romblon, Romblon, Philippines",
        category: "Beach",
        rating: 4.8,
        imgUrl: "/images/destinations/bonbon.jpg",
        openingHours: "7:00 AM",
        closingHours: "5:00 PM",
        guides: [{ id: "1" }, { id: "2" }],
        coordinates: {
            lat: 12.578737019901709,
            lng: 122.27035859323206
        },
        keywords: ["Swimming", "Snorkeling", "Beach Camping", "Island Hopping"]
    },
    {
        id: "2",
        name: "Fuerza San Andres",
        description: "A historical Spanish colonial fortress offering panoramic views of the sea.",
        location: "Brgy. 2, Romblon, Romblon Philippines",
        category: "Historical",
        rating: 4.5,
        imgUrl: "/images/destinations/fuerza.jpg",
        openingHours: "9:00 AM",
        closingHours: "5:00 PM",
        guides: [{ id: "2" }, { id: "3" }],
        coordinates: {
            lat: 12.578737019901709,
            lng: 122.27035859323206
        },
        keywords: ["Guided Tours", "Photography", "Historical Learning", "Sunset Viewing"]
    }
];
