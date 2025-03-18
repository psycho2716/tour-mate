"use server";

interface PlaceDetails {
    placeId: string;
    photo: string | null;
    rating: number | null;
    userRatingsTotal: number | null;
}

export async function getPlaceDetails(
    lat: number,
    lng: number
): Promise<{ data: PlaceDetails | null; error: string | null }> {
    try {
        // Validate inputs
        if (!lat || !lng) {
            return { data: null, error: "Invalid coordinates provided" };
        }

        // Validate API key
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            return { data: null, error: "API key not configured" };
        }

        // First, get the place ID using Places API
        const nearbySearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1&type=establishment&key=${apiKey}`;

        const nearbySearchResponse = await fetch(nearbySearchUrl, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        if (!nearbySearchResponse.ok) {
            throw new Error(`Nearby search failed: ${nearbySearchResponse.statusText}`);
        }

        const nearbySearchData = await nearbySearchResponse.json();

        if (!nearbySearchData.results?.[0]?.place_id) {
            return { data: null, error: "No places found at this location" };
        }

        const placeId = nearbySearchData.results[0].place_id;

        // Fetch place details using Places API v1
        const placeDetailsResponse = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=id,photos,rating,userRatingCount&key=${apiKey}`,
            {
                method: "GET",
                headers: {
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "id,photos,rating,userRatingCount",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );

        if (!placeDetailsResponse.ok) {
            throw new Error(`Place details failed: ${placeDetailsResponse.statusText}`);
        }

        const placeData = await placeDetailsResponse.json();

        // Get the photo if available
        let photoUrl = null;
        if (placeData.photos?.[0]?.name) {
            const photoResponse = await fetch(
                `https://places.googleapis.com/v1/${placeData.photos[0].name}/media?key=${apiKey}&maxHeightPx=400&maxWidthPx=400`,
                {
                    method: "GET",
                    headers: {
                        "X-Goog-Api-Key": apiKey,
                        Accept: "image/*"
                    }
                }
            );

            if (!photoResponse.ok) {
                console.error("Failed to fetch photo:", photoResponse.statusText);
            } else {
                const photoBuffer = await photoResponse.arrayBuffer();
                const base64Photo = Buffer.from(photoBuffer).toString("base64");
                photoUrl = `data:image/jpeg;base64,${base64Photo}`;
            }
        }

        return {
            data: {
                placeId,
                photo: photoUrl,
                rating: placeData.rating || null,
                userRatingsTotal: placeData.userRatingCount || null
            },
            error: null
        };
    } catch (error) {
        console.error("Error in getPlaceDetails:", error);
        return {
            data: null,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        };
    }
}
