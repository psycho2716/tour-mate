"use client";

import { Car, Clock, MapPin, Navigation, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import MapComponent from "../common/map";
import { useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { getPlaceDetails } from "@/app/(actions)/places";

const libraries: "places"[] = ["places"];

interface MapDrawerProps {
    title: string;
    location: string;
    coordinates: google.maps.LatLngLiteral;
    isOpen?: boolean;
    onClose?: () => void;
}

type TravelMode = "driving" | "walking";

const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "0.5rem"
};

const MapDrawer = ({ title, location, coordinates }: MapDrawerProps) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries
    });

    const [travelMode, setTravelMode] = useState<TravelMode>("driving");
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [placeDetails, setPlaceDetails] = useState<{
        placeId: string;
        photo: string | null;
        rating: number | null;
        userRatingsTotal: number | null;
    } | null>(null);

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                const { data } = await getPlaceDetails(coordinates.lat, coordinates.lng);

                if (data) {
                    setPlaceDetails(data);
                }
            } catch (error) {
                console.error("Error fetching place details:", error);
            }
        };

        if (coordinates) {
            fetchPlaceDetails();
        }
    }, [coordinates]);

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

    // Calculate route when user location or travel mode changes
    useEffect(() => {
        if (!isLoaded || !userLocation) return;

        const calculateRoute = async () => {
            setIsLoading(true);
            setError(null);

            if (!window.google?.maps) {
                console.error("Google Maps not loaded");
                setError("Maps service not available. Please try again later.");
                setIsLoading(false);
                return;
            }

            const directionsService = new google.maps.DirectionsService();

            try {
                const result = await directionsService.route({
                    origin: userLocation,
                    destination: coordinates,
                    travelMode:
                        travelMode === "driving"
                            ? google.maps.TravelMode.DRIVING
                            : google.maps.TravelMode.WALKING,
                    optimizeWaypoints: true
                });

                setDirections(result);
                setIsLoading(false);
            } catch (error) {
                console.error("Directions request error:", error);
                setError("Could not calculate route. Please try again.");
                setIsLoading(false);
            }
        };

        calculateRoute();
    }, [isLoaded, userLocation, coordinates, travelMode]);

    return (
        <DrawerContent className="h-[90vh] flex flex-col">
            <DrawerHeader className="flex-shrink-0 border-b border-border">
                <div className="flex items-start justify-between">
                    <div className="w-full text-center">
                        <DrawerTitle className="text-2xl font-semibold">{title}</DrawerTitle>
                        <p className="text-sm text-muted-foreground mt-1">{location}</p>
                        {placeDetails?.rating && (
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="text-yellow-500">★</span>
                                <span className="font-medium">
                                    {placeDetails.rating.toFixed(1)}
                                </span>
                                {placeDetails.userRatingsTotal && (
                                    <span className="text-sm text-muted-foreground">
                                        ({placeDetails.userRatingsTotal} reviews)
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    <DrawerClose>
                        <X className="h-6 w-6" />
                    </DrawerClose>
                </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Left side - Controls and Directions */}
                    <div className="basis-1/2">
                        <div className="px-4 pt-4 sticky top-0 bg-background z-10">
                            {/* Travel Mode Selector */}
                            <div className="w-full bg-gray-100 rounded-md p-1 flex shadow-sm">
                                <button
                                    onClick={() => setTravelMode("driving")}
                                    disabled={isLoading}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-md",
                                        travelMode === "driving" && "bg-white shadow-sm"
                                    )}
                                >
                                    <Car className="h-4 w-4" /> Driving
                                </button>
                                <button
                                    onClick={() => setTravelMode("walking")}
                                    disabled={isLoading}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-md",
                                        travelMode === "walking" && "bg-white shadow-sm"
                                    )}
                                >
                                    <MapPin className="h-4 w-4" /> Walking
                                </button>
                            </div>
                        </div>

                        <div className="px-4 space-y-6 pt-6">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            {directions && directions.routes[0] && (
                                <>
                                    {/* Route Summary */}
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <Navigation className="h-5 w-5 text-gray-700" />
                                                <span className="text-lg text-gray-700">
                                                    Total Distance:
                                                </span>
                                            </div>
                                            <p className="text-lg font-semibold">
                                                {directions.routes[0].legs[0].distance?.text}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-gray-700" />
                                                <span className="text-lg text-gray-700">
                                                    Duration:
                                                </span>
                                            </div>
                                            <p className="text-lg font-semibold">
                                                {directions.routes[0].legs[0].duration?.text}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Directions */}
                                    <div className="space-y-3 pb-4">
                                        <h3 className="text-lg font-semibold">Directions</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Follow the directions below to reach the destination.
                                        </p>

                                        <ul className="rounded-lg border border-border divide-y divide-border">
                                            {directions.routes[0].legs[0].steps.map(
                                                (step, index) => (
                                                    <li
                                                        key={index}
                                                        className={cn(
                                                            "flex gap-4 p-4",
                                                            index % 2 === 1 && "bg-gray-50"
                                                        )}
                                                    >
                                                        {travelMode === "driving" ? (
                                                            <Car className="h-5 w-5 text-gray-700 flex-shrink-0" />
                                                        ) : (
                                                            <MapPin className="h-5 w-5 text-gray-700 flex-shrink-0" />
                                                        )}
                                                        <div className="space-y-2 min-w-0">
                                                            <p
                                                                className="font-medium"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: step.instructions
                                                                }}
                                                            />
                                                            <div className="flex flex-wrap gap-2">
                                                                <span className="text-muted-foreground border border-muted px-3 py-1 rounded-full text-sm">
                                                                    {step.distance?.text}
                                                                </span>
                                                                <span className="text-muted-foreground border border-muted px-3 py-1 rounded-full text-sm">
                                                                    {step.duration?.text}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right side - Map */}
                    <div className="basis-1/2 p-4 md:sticky md:top-0 h-fit">
                        <div className="rounded-lg overflow-hidden h-[60vh] md:h-full">
                            {isLoaded && (
                                <MapComponent
                                    zoom={14}
                                    isLoaded={isLoaded}
                                    containerStyle={containerStyle}
                                >
                                    {!directions && userLocation && (
                                        <Marker position={userLocation} />
                                    )}
                                    {!directions && <Marker position={coordinates} />}
                                    {directions && (
                                        <DirectionsRenderer
                                            directions={directions}
                                            options={{
                                                suppressMarkers: false,
                                                polylineOptions: {
                                                    strokeColor: "#3b82f6",
                                                    strokeWeight: 5,
                                                    strokeOpacity: 0.8
                                                }
                                            }}
                                        />
                                    )}
                                </MapComponent>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DrawerContent>
    );
};

export default MapDrawer;
