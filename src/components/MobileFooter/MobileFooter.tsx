// src/components/MobileFooter/MobileFooter.tsx
"use client";

import { FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Search, Menu as MenuIcon, Headset } from "lucide-react";

interface MobileFooterProps {
    onSearchOpen: () => void;
    onSupport: () => void;
    onMenuToggle: () => void;
}

const MobileFooter: FC<MobileFooterProps> = ({
    onSearchOpen,
    onSupport,
    onMenuToggle,
}) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    if (!isMobile) return null;

    return (
        <div
            className="
        fixed bottom-4 left-1/2 transform -translate-x-1/2
        w-[calc(90%-2rem)]
        h-12
        bg-[#fe415e]
        rounded-4xl
        flex items-center justify-between
        px-6
        shadow-lg
        z-30
      "
        >
            <button onClick={onSupport} className="flex-1 flex justify-center" aria-label="Suporte">
                <Headset size={24} className="text-white" />
            </button>
            <button onClick={onSearchOpen} className="flex-1 flex justify-center" aria-label="Buscar">
                <Search size={28} className="text-white" />
            </button>
            <button onClick={onMenuToggle} className="flex-1 flex justify-center" aria-label="Menu">
                <MenuIcon size={24} className="text-white" />
            </button>
        </div>
    );
};

export default MobileFooter;
