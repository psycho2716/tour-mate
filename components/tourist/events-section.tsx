import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import EventCard from "./event-card";
import { events } from "@/data/events";
export function EventsSection() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <EventCard key={event.title} {...event} />
                ))}
            </div>
        </section>
    );
}
