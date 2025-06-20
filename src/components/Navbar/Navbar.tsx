"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Menu as MenuIcon, X } from "lucide-react";
import SearchBar from "@/components/SearchBar/SearchBar";

interface NavbarProps {
  isMobile: boolean;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
}

const Navbar: FC<NavbarProps> = ({
  isMobile,
  menuOpen,
  onMenuToggle,
  onSelectLocation,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="w-full h-20 bg-white px-6 flex items-center justify-between shadow-lg z-20 overflow-visible">
      {/* Logo */}
      <div className="relative flex-shrink-0 h-full flex items-center ml-2 sm:ml-6 overflow-visible">
        <div className="relative w-26 h-26">
          <Image
            src={isMobile ? "/megavale-black.png" : "/megavale-black.png"}
            alt="Logo Megavale"
            fill
            className="object-contain rounded-full"
          />
        </div>
      </div>

      {/* SearchBar dispara onSelectLocation */}
      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-xs sm:max-w-lg">
          <SearchBar onSelectLocation={onSelectLocation} />
        </div>
      </div>

      {/* Menu (desktop) */}
      {!isMobile && (
        <button
          onClick={onMenuToggle}
          className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <MenuIcon size={24} className="text-[#fe415e]" />
          )}
        </button>
      )}
    </nav>
  );
};

export default Navbar;