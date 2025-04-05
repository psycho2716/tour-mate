export interface TourGuide {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    languages: string[];
    rating: number;
    avatar: string;
    password?: string;
}

const tourGuides: TourGuide[] = [
    {
        id: "1",
        name: "John Smith",
        email: "john@gmail.com",
        phoneNumber: "09278872642",
        specialization: "Historical Tours",
        languages: ["English", "Tagalog"],
        avatar: "/images/tour-guides/sample-profile.jpg",
        rating: 4.2,
        password: "SamplePassword123"
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "jane@gmail.com",
        phoneNumber: "092788726442",
        specialization: "Educational Tours",
        languages: ["English", "Tagalog"],
        avatar: "/images/tour-guides/sample-profile.jpg",
        rating: 4.3,
        password: "SamplePassword123"
    },
    {
        id: "3",
        name: "Michael Dela Cruz",
        email: "michael@gmail.com",
        phoneNumber: "092788726442",
        specialization: "Landmark Tours",
        languages: ["English", "Tagalog"],
        avatar: "/images/tour-guides/sample-profile.jpg",
        rating: 4.1,
        password: "SamplePassword123"
    }
];

export default tourGuides;
