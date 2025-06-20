// src/app/map/page.tsx
"use client";

import MapContainer from "@/components/MapContainer/MapContainer";
import Legend from "@/components/Legend/Legend"; // se usar
import LocationIndicator from "@/components/LocationIndicator/LocationIndicator"; // se usar

export default function MapPage() {
    return (
        <div className="w-full h-full relative">
            <MapContainer />
            <LocationIndicator />
            {/* <Legend /> */}
        </div>
    );
}
