import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface EventCardProps {
    imgUrl: string;
    title: string;
    date: string;
    location: string;
    description: string;
    category: string;
}

const EventCard = ({ imgUrl, title, date, location, description, category }: EventCardProps) => {
    return (
        <div className="relative max-w-[350px] rounded-lg overflow-hidden group">
            <div className="absolute inset-0">
                <Image
                    src={imgUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent" />
            </div>

            <div className="relative p-6 flex flex-col justify-end min-h-[350px]">
                <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full absolute top-4 right-3">
                    {category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <div className="flex items-center text-white/80 text-sm mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{location}</span>
                </div>
                <p className="text-white/90 text-sm mt-3">{description}</p>
            </div>
        </div>
    );
};

export default EventCard;
