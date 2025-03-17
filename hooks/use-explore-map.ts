import { useState, useCallback, useRef } from "react";
import { Destination } from "@/data/destinations";

// Type for the marker
type MarkerType = Destination & { placeId?: string };

export function useExploreMap(isLoaded: boolean) {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
    const [placePhoto, setPlacePhoto] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const handleMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const findPlaceId = useCallback(
        async (title: string) => {
            if (!isLoaded || !window.google || !mapRef.current) return null;

            const service = new google.maps.places.PlacesService(mapRef.current);

            return new Promise<string | null>((resolve) => {
                const request = {
                    query: title + ", Romblon, Philippines",
                    fields: ["place_id", "formatted_address", "geometry", "name"]
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
                service.getDetails(
                    {
                        placeId: placeId,
                        fields: ["photos", "name"]
                    },
                    (place, status) => {
                        if (
                            status === google.maps.places.PlacesServiceStatus.OK &&
                            place?.photos?.[0]
                        ) {
                            const photo = place.photos[0];
                            const photoUrl = photo.getUrl({
                                maxWidth: 400,
                                maxHeight: 300
                            });
                            setPlacePhoto(photoUrl);
                        } else {
                            setPlacePhoto(null);
                        }
                    }
                );
            } catch (error) {
                console.error("Error fetching place photo:", error);
                setPlacePhoto(null);
            }
        },
        [isLoaded]
    );

    const handleMarkerClick = async (marker: MarkerType) => {
        setSelectedMarker(marker);
        setPlacePhoto(null);

        const placeId = marker.placeId || (await findPlaceId(marker.name));
        if (placeId) {
            marker.placeId = placeId;
            fetchPlacePhoto(placeId);
        }
    };

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

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
        setPlacePhoto(null);
    };

    return {
        mapRef,
        selectedMarker,
        placePhoto,
        isLocating,
        userLocation,
        locationError,
        handleMapLoad,
        handleMarkerClick,
        handleLocateMe,
        handleInfoWindowClose
    };
}
