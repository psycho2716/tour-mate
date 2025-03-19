declare type Destination = {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    guides: number;
    category: "landmark" | "beach" | "mountain" | "city" | "historical";
    keywords: string[];
    openingHours: string;
    coordinates: {
        lat: number;
        lng: number;
    };
};

declare type ActivityType =
    | "cultural"
    | "shopping"
    | "nightlife"
    | "beach"
    | "nature"
    | "adventure"
    | "relaxation"
    | "food";

declare interface Activity {
    id: string;
    name: string;
    description: string;
    type: ActivityType;
    location: string;
    image: string;
    time: string;
}

declare interface GeneratedDay {
    date: string;
    activities: Activity[];
}

declare interface GeneratedItinerary {
    days: GeneratedDay[];
    interests: ActivityType[];
    dateRange: {
        start: string;
        end: string;
    };
}

type UserType = "tourist" | "tour-guide" | "admin";

declare interface User {
    id: number;
    type: UserType;
    avatar: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string | null;
    lastBookedLocation: Destination | null;
    lastActive: string;
}

export interface Tourist {
    id: string;
    name: string;
    country: string;
    avatar?: string;
}

export interface TourGuide {
    id: string;
    name: string;
    rating: number;
    avatar?: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

declare interface Booking {
    id: string;
    title: string;
    image: string;
    location: string;
    tourist: Tourist;
    tourGuide: TourGuide;
    date: string;
    time: string;
    numberOfPeople: number;
    specialRequests?: string;
    status: BookingStatus;
    coordinates: {
        lat: number;
        lng: number;
    };
}
