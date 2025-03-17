"use client";

import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";

// Map container style
const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "0.5rem"
};

const libraries: "places"[] = ["places"];

// Default center position (Philippines)
const center = {
    lat: 12.578433351483497,
    lng: 122.26896384452779
};

// Sample marker data
const markers = [
    {
        id: 1,
        position: { lat: 12.578737019901709, lng: 122.27035859323206 },
        title: "Fuerza San Andres",
        description:
            "The Twin Forts of Romblon are a pair of Spanish fortifications located in the town of Romblon, Romblon in the Philippines."
    }
];

// Type for the marker
type MarkerType = (typeof markers)[0] & { placeId?: string };

export function ExploreMapSection() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
    const [placePhoto, setPlacePhoto] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const findPlaceId = useCallback(
        async (title: string) => {
            if (!isLoaded || !window.google || !mapRef.current) return null;

            const service = new google.maps.places.PlacesService(mapRef.current);

            return new Promise<string | null>((resolve) => {
                const request = {
                    query: title + ", Philippines",
                    fields: ["place_id"]
                };

                service.findPlaceFromQuery(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
                        resolve(results[0].place_id || null);
                    } else {
                        console.error("Error finding place:", status);
                        resolve(null);
                    }
                });
            });
        },
        [isLoaded]
    );

    const fetchPlacePhoto = useCallback(
        async (placeId: string) => {
            if (!isLoaded || !window.google || !mapRef.current) return;

            const service = new google.maps.places.PlacesService(mapRef.current);

            try {
                const request = {
                    placeId: placeId,
                    fields: ["photos"]
                };

                service.getDetails(request, (place, status) => {
                    if (
                        status === google.maps.places.PlacesServiceStatus.OK &&
                        place?.photos?.[0]
                    ) {
                        const photo = place.photos[0];
                        const photoUrl = photo.getUrl({ maxWidth: 400, maxHeight: 300 });
                        setPlacePhoto(photoUrl);
                    } else {
                        setPlacePhoto(null);
                    }
                });
            } catch (error) {
                console.error("Error fetching place photo:", error);
                setPlacePhoto(null);
            }
        },
        [isLoaded]
    );

    const handleMarkerClick = async (marker: MarkerType) => {
        setSelectedMarker(marker);
        setPlacePhoto(null); // Reset photo

        // Find place ID if not already cached
        const placeId = marker.placeId || (await findPlaceId(marker.title));
        if (placeId) {
            marker.placeId = placeId; // Cache the place ID
            fetchPlacePhoto(placeId);
        }
    };

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        mapRef.current = map;
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        mapRef.current = null;
        setMap(null);
    }, []);

    const handleLocateMe = () => {
        if (!isLoaded || !window.google) return;

        setIsLocating(true);
        setLocationError(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    setUserLocation(userPos);

                    if (mapRef.current) {
                        mapRef.current.panTo(userPos);
                        mapRef.current.setZoom(14);
                    }

                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationError(
                        "Could not get your location. Please check your browser permissions."
                    );
                    setIsLocating(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setLocationError("Geolocation is not supported by your browser");
            setIsLocating(false);
        }
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Explore Map</h2>
                <Button
                    onClick={handleLocateMe}
                    disabled={isLocating || !isLoaded}
                    className="flex items-center gap-2"
                >
                    {isLocating ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Locating...</span>
                        </>
                    ) : (
                        <>
                            <MapPin className="h-4 w-4" />
                            <span>Locate Me</span>
                        </>
                    )}
                </Button>
            </div>

            {locationError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {locationError}
                </div>
            )}

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={6}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        // Using default Google Maps styling (no custom styles)
                        disableDefaultUI: false,
                        zoomControl: true,
                        mapTypeControl: true,
                        streetViewControl: true,
                        fullscreenControl: true
                    }}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            title={marker.title}
                            onClick={() => handleMarkerClick(marker)}
                            icon={{
                                url: "/images/pin.png",
                                scaledSize:
                                    isLoaded && window.google
                                        ? new google.maps.Size(40, 40)
                                        : undefined,
                                origin:
                                    isLoaded && window.google
                                        ? new google.maps.Point(0, 0)
                                        : undefined,
                                anchor:
                                    isLoaded && window.google
                                        ? new google.maps.Point(15, 15)
                                        : undefined
                            }}
                        />
                    ))}

                    {/* User location marker */}
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            title="Your Location"
                            icon={{
                                url: "data:image/svg+xml;charset=UTF-8,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E %40keyframes pulse %7B 0%25 %7B stroke-width: 0; stroke-opacity: 1; transform: scale(0.5); %7D 100%25 %7B stroke-width: 2; stroke-opacity: 0; transform: scale(1); %7D %7D circle%23PulseCircle %7B animation: pulse 2s ease-out infinite; transform-origin: center center; %7D %3C/style%3E%3C/defs%3E%3Cg id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Ccircle id='PulseCircle' stroke='%234299E1' cx='12' cy='12' r='10' /%3E%3Ccircle id='OuterCircle' fill='%23FFFFFF' cx='12' cy='12' r='6'/%3E%3Ccircle id='InnerCircle' fill='%234299E1' cx='12' cy='12' r='4.5'/%3E%3C/g%3E%3C/svg%3E",
                                scaledSize:
                                    isLoaded && window.google
                                        ? new google.maps.Size(48, 48)
                                        : undefined,
                                origin:
                                    isLoaded && window.google
                                        ? new google.maps.Point(0, 0)
                                        : undefined,
                                anchor:
                                    isLoaded && window.google
                                        ? new google.maps.Point(24, 24)
                                        : undefined
                            }}
                        />
                    )}

                    {selectedMarker && (
                        <InfoWindow
                            position={selectedMarker.position}
                            onCloseClick={() => {
                                setSelectedMarker(null);
                                setPlacePhoto(null);
                            }}
                        >
                            <div className="max-w-[290px] p-2 px-1">
                                {placePhoto && (
                                    <div className="w-full h-full max-h-[180px] relative mb-3 overflow-hidden rounded-lg">
                                        <img
                                            src={placePhoto}
                                            alt={selectedMarker.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="font-bold text-gray-900 text-xl">
                                    {selectedMarker.title}
                                </h3>
                                <p className="font-medium text-gray-600 mt-1">
                                    {selectedMarker.description}
                                </p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            ) : (
                <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <p>Loading map...</p>
                </div>
            )}
        </section>
    );
}
