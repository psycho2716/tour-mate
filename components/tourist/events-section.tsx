import EventCard from "./event-card";
import { events } from "@/data/events";
export function EventsSection() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Events</h2>
            <div className="w-full flex gap-6 overflow-x-auto">
                {events.map((event) => (
                    <EventCard key={event.title} {...event} />
                ))}
            </div>
        </section>
    );
}
