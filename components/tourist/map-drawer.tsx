"use client";

import { Car, Clock, MapPin, Navigation, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import MapComponent from "../common/map";
import { useJsApiLoader, Marker } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

interface MapDrawerProps {
    title: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

type TravelMode = "driving" | "walking";

const containerStyle = {
    width: "100%",
    height: "600px",
    borderRadius: "0.5rem"
};

const MapDrawer = ({ title, location, coordinates }: MapDrawerProps) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries
    });

    const [travelMode, setTravelMode] = useState<TravelMode>("driving");
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => setError("Could not get your location. Check browser permissions.")
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    useEffect(() => {
        if (!isLoaded || !userLocation) return;

        const fetchRoute = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://routes.googleapis.com/directions/v2:computeRoutes`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                            "X-Goog-FieldMask":
                                "routes.duration,routes.distanceMeters,routes.polyline"
                        },
                        body: JSON.stringify({
                            origin: { location: { latLng: userLocation } },
                            destination: { location: { latLng: coordinates } },
                            travelMode: travelMode.toUpperCase()
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch route data");
                }

                const data = await response.json();
                setDirections(data.routes[0]);
                setIsLoading(false);
            } catch (error) {
                setError("Could not calculate route. Ensure the Routes API is enabled.");
                setIsLoading(false);
            }
        };
    }, [isLoaded, userLocation, coordinates, travelMode]);

    return (
        <DrawerContent>
            <div className="h-full max-h-[80vh]">
                <DrawerHeader className="border-b border-border">
                    <div className="flex items-start justify-between">
                        <div className="w-full text-center">
                            <DrawerTitle className="text-2xl font-semibold">{title}</DrawerTitle>
                            <p className="text-sm text-muted-foreground mt-1">{location}</p>
                        </div>
                        <DrawerClose>
                            <X className="h-6 w-6" />
                        </DrawerClose>
                    </div>
                </DrawerHeader>
                <div className="flex flex-col md:flex-row p-4 gap-2">
                    <div className="basis-1/2 px-4 py-6 space-y-4">
                        <div className="w-full bg-gray-100 rounded-md p-1 flex">
                            <button
                                onClick={() => setTravelMode("driving")}
                                disabled={isLoading}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-md",
                                    travelMode === "driving" && "bg-white"
                                )}
                            >
                                <Car className="h-4 w-4" /> Driving
                            </button>
                            <button
                                onClick={() => setTravelMode("walking")}
                                disabled={isLoading}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-md",
                                    travelMode === "walking" && "bg-white"
                                )}
                            >
                                <MapPin className="h-4 w-4" /> Walking
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2 mb-8">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Navigation className="h-5 w-5 text-gray-700" />
                                    <span className="text-lg text-gray-700">Total Distance:</span>
                                </div>
                                <p className="text-lg font-semibold">400 m</p>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-gray-700" />
                                    <span className="text-lg text-gray-700">Duration:</span>
                                </div>
                                <p className="text-lg font-semibold">17 mins</p>
                            </div>
                        </div>

                        {/* Directions */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Directions</h3>
                            <p className="text-sm text-muted-foreground">
                                Follow the directions below to reach the destination.
                            </p>

                            <ul className="w-full rounded-lg border border-border">
                                <li className="flex gap-4 p-4 border-b-[0.2px] border-border">
                                    <Car className="h-5 w-5 text-gray-700" />
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            via MA Roxas Ave and Fort San Andres Walkway
                                        </p>
                                        <div className="flex gap-3">
                                            <span className="text-muted-foreground border border-muted px-3 py-0.7 rounded-full">
                                                400 m
                                            </span>
                                            <span className="text-muted-foreground border border-muted px-3 py-0.7 rounded-full">
                                                400 m
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 bg-gray-100/50">
                                    <Car className="h-5 w-5 text-gray-700" />
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            via Thermopilas Street and Fort San Andres Walkway
                                        </p>
                                        <div className="flex gap-3">
                                            <span className="text-muted-foreground border border-muted px-3 py-0.7 rounded-full">
                                                400 m
                                            </span>
                                            <span className="text-muted-foreground border border-muted px-3 py-0.7 rounded-full">
                                                400 m
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                        {isLoaded && (
                            <MapComponent
                                zoom={14}
                                isLoaded={isLoaded}
                                containerStyle={containerStyle}
                            >
                                {userLocation && <Marker position={userLocation} />}
                                <Marker position={coordinates} />
                            </MapComponent>
                        )}
                    </div>
                </div>
            </div>
        </DrawerContent>
    );
};

export default MapDrawer;
