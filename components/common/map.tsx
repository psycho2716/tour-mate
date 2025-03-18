"use client";

import { GoogleMap } from "@react-google-maps/api";
import { useCallback } from "react";

interface MapComponentProps {
    containerStyle?: {
        width: string;
        height: string;
    };
    center?: {
        lat: number;
        lng: number;
    };
    children?: React.ReactNode;
    zoom?: number;
    isLoaded: boolean;
    options?: google.maps.MapOptions;
    onMapLoad?: (map: google.maps.Map) => void;
}

const defaultContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "0.5rem"
};

const defaultCenter = {
    lat: 12.578433351483497,
    lng: 122.26896384452779
};

export default function MapComponent({
    containerStyle = defaultContainerStyle,
    center = defaultCenter,
    children,
    zoom = 6,
    isLoaded,
    options = {
        streetViewControl: true,
        fullscreenControl: true,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false
    },
    onMapLoad
}: MapComponentProps) {
    const handleLoad = useCallback(
        (map: google.maps.Map) => {
            if (onMapLoad) {
                onMapLoad(map);
            }
        },
        [onMapLoad]
    );

    if (!isLoaded) {
        return (
            <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p>Loading map...</p>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={handleLoad}
            options={options}
        >
            {children}
        </GoogleMap>
    );
}
