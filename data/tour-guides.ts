interface TourGuide {
    id: string;
    name: string;
    rating: number;
    specialization: string;
    imageUrl: string;
}

const tourGuides: TourGuide[] = [
    {
        id: "1",
        name: "John Smith",
        rating: 4.3,
        specialization: "Historical Tours",
        imageUrl: ""
    },
    {
        id: "2",
        name: "Jane Doe",
        rating: 4.3,
        specialization: "Educational Tours",
        imageUrl: ""
    },
    {
        id: "3",
        name: "Michael Dela Cruz",
        rating: 4.3,
        specialization: "Landmark Tours",
        imageUrl: ""
    }
];

export default tourGuides;
