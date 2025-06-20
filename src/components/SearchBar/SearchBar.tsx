"use client";

import { FC, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";

interface SearchBarProps {
  onSelectLocation: (lat: number, lng: number) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSelectLocation }) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    const loc = place.geometry?.location;
    if (loc) {
      onSelectLocation(loc.lat(), loc.lng());
      inputRef.current!.value = "";
    }
  };

  return (
    <Autocomplete
      onLoad={auto => setAutocomplete(auto)}
      onPlaceChanged={handlePlaceChanged}
    >
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar posto ou cidade…"
          className="
            w-full bg-gray-100 placeholder-gray-400 text-gray-800
            rounded-lg pl-4 pr-10 py-2
            focus:outline-none focus:ring-2 focus:ring-[#fe415e]
          "
        />
        <Search
          size={22}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#fe415e] cursor-pointer"
          onClick={handlePlaceChanged}
        />
      </div>
    </Autocomplete>
  );
};

export default SearchBar;