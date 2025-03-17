import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface MiniMapProps {
    latitude: number;
    longitude: number;
    width?: number;
    height?: number;
    zoom?: number;
    markerColor?: string;
}

const MiniMap = ({
    latitude,
    longitude,
    width = 400,
    height = 200,
    zoom = 15,
    markerColor = "red"
}: MiniMapProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&scale=2&markers=color:${markerColor}%7C${latitude},${longitude}&key=${apiKey}`;

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
            {isLoading && <Skeleton className="absolute inset-0 z-10" style={{ width, height }} />}
            <Image
                src={staticMapUrl}
                alt="Location Map"
                width={width}
                height={height}
                className="object-cover"
                onLoad={() => setIsLoading(false)}
                priority
            />
        </div>
    );
};

export default MiniMap;
