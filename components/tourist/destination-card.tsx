import React from "react";
import Image from "next/image";
import { MapPin, Star, Users } from "lucide-react";
import { Destination } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DestinationCard = ({ destination }: { destination: Destination }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden border shadow-sm">
            <div className="relative h-48">
                <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{destination.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    <span>{destination.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{destination.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{destination.guides} guides</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full mt-4 text-sm" asChild>
                    <Link href={`/destinations/${destination.id}`}>View Details</Link>
                </Button>
            </div>
        </div>
    );
};

export default DestinationCard;
