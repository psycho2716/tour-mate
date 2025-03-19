import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, UserCog } from "lucide-react";

export default function AdminPage() {
    const stats = [
        {
            title: "Total Events",
            value: "1",
            icon: Calendar,
            description: "Active events in the system"
        },
        {
            title: "Total Destinations",
            value: "1",
            icon: MapPin,
            description: "Available tourist destinations"
        },
        {
            title: "Total Tourists",
            value: "1",
            icon: Users,
            description: "Registered tourists"
        },
        {
            title: "Total Tour Guides",
            value: "1",
            icon: UserCog,
            description: "Active tour guides"
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome to your dashboard.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-gray-500">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
