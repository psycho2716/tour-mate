import { ArrowLeft, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { destinations } from "@/data/mockData";
import tourGuides from "@/data/tour-guides";
import BookingLocationContainer from "@/components/tourist/destination/booking-location-container";
import TourGuideCard from "@/components/tourist/tour-guide-card";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function DestinationPage({ params }: PageProps) {
    const destinationId = Number(await params.id);

    // Fetch destination data from the database based on the id
    const destination = destinations.find((destination) => destination.id === destinationId);

    if (!destination) {
        return <div>Destination not found</div>;
    }

    return (
        <Drawer>
            <div className="min-h-screen bg-background">
                {/* Hero Section with Background Image */}
                <div className="relative h-[60vh] w-full">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                    {/* Back Button and Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-20 gap-4">
                        <Link
                            href="/home"
                            className="flex items-center text-sm gap-2 text-white w-fit font-light"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Return Home
                        </Link>

                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-6xl font-bold text-white">
                                {destination.name}
                            </h1>

                            <div className="flex items-center text-sm md:text-lg gap-4">
                                <div className="flex items-center gap-2 text-white">
                                    <MapPin className="h-5 w-5" />
                                    {destination.location}
                                </div>
                                <div className="flex items-center gap-1 text-white">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span>{destination.rating} rating</span>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="text-xs md:text-sm capitalize"
                                >
                                    {destination.category}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - About & Tour Guides */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Section */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-4">About</h2>
                                <p
                                    className="text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: destination.description }}
                                />
                            </section>

                            {/* Tour Guides Section */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Available Tour Guides
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tourGuides.map((guide) => (
                                        <TourGuideCard
                                            key={guide.id}
                                            guide={guide}
                                            destination={destination}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column - Booking & Location */}
                        <BookingLocationContainer destination={destination} />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
