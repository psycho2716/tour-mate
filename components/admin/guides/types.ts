export type TourGuide = {
    id: string;
    image: string;
    name: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    languages: string[];
    rating: number;
    password?: string;
    status: "pending" | "approved";
    trainingCertificate?: string;
};
