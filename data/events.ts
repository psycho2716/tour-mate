export type Event = {
    id: string;
    title: string;
    category: string;
    imgUrl: string;
    date: string;
    location: string;
    description: string;
    status: EventStatus;
};

export type EventStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export const categories = [
    "Cultural",
    "Festival",
    "Music",
    "Food",
    "Sports",
    "Educational",
    "Historical"
];

export const events: Event[] = [
    {
        id: "1",
        title: "Biniray Festival",
        category: "Festival",
        imgUrl: "/images/event-1.jpg",
        date: "Jan 11, 2025",
        location: "Poblacion Romblon, Romblon, Philippines",
        status: "Upcoming",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."
    }
];
