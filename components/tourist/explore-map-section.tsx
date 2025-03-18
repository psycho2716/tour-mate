"use client";

import { useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { destinations } from "@/data/destinations";
import MapComponent from "../common/map";
import { useExploreMap } from "@/hooks/use-explore-map";
import Image from "next/image";

const libraries: "places"[] = ["places"];

export function ExploreMapSection() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries
    });

    const {
        selectedMarker,
        placePhoto,
        isLocating,
        userLocation,
        locationError,
        handleMapLoad,
        handleMarkerClick,
        handleLocateMe,
        handleInfoWindowClose
    } = useExploreMap(isLoaded);

    const markers = destinations.map((destination) => ({
        ...destination,
        position: { lat: destination.coordinates.lat, lng: destination.coordinates.lng }
    }));

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

            <MapComponent isLoaded={isLoaded} onMapLoad={handleMapLoad} zoom={12}>
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        title={marker.name}
                        onClick={() => handleMarkerClick(marker)}
                        icon={{
                            url: "/images/pin.png",
                            scaledSize:
                                isLoaded && window.google
                                    ? new google.maps.Size(40, 40)
                                    : undefined,
                            origin:
                                isLoaded && window.google ? new google.maps.Point(0, 0) : undefined,
                            anchor:
                                isLoaded && window.google
                                    ? new google.maps.Point(20, 20)
                                    : undefined
                        }}
                    />
                ))}

                {userLocation && (
                    <Marker
                        position={userLocation}
                        title="Your Location"
                        icon={{
                            url: `data:image/svg+xml,${encodeURIComponent(`
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
                                </svg>
                            `)}`,
                            scaledSize:
                                isLoaded && window.google
                                    ? new google.maps.Size(24, 24)
                                    : undefined,
                            anchor:
                                isLoaded && window.google
                                    ? new google.maps.Point(12, 12)
                                    : undefined
                        }}
                    />
                )}

                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.coordinates}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <div className="max-w-[290px] p-2 px-1">
                            {placePhoto && (
                                <div className="w-full h-full max-h-[180px] relative mb-3 overflow-hidden rounded-lg">
                                    <Image
                                        src={placePhoto}
                                        alt={selectedMarker.name}
                                        width={290}
                                        height={180}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <h3 className="font-bold text-gray-900 text-xl">
                                {selectedMarker.name}
                            </h3>
                            <p className="font-medium text-gray-600 mt-1">
                                {selectedMarker.description}
                            </p>
                        </div>
                    </InfoWindow>
                )}
            </MapComponent>
        </section>
    );
}
