"use client";
import { ReactNode, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { EstabelecimentosProvider } from "@/context/EstabelecimentosContext";
import Navbar from "@/components/Navbar/Navbar";
import MapContainer from "@/components/MapContainer/MapContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { AdBanner } from "@/components/AdBanner/AdBanner";
import MobileFooter from "@/components/MobileFooter/MobileFooter";

interface MainLayoutProps { children: ReactNode; }

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useMediaQuery("(max-width:640px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <EstabelecimentosProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar
          isMobile={isMobile}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(o => !o)}
          onSelectLocation={(lat, lng) => setSearchCenter({ lat, lng })}
        />

        <div className="flex-1 relative overflow-hidden">
          {/* passamos o searchCenter também */}
          <MapContainer overrideCenter={searchCenter} />

          <AdBanner
            images={["/banners/Porque-usar-megavale.jpg"]}
            links={["https://www.megavalecard.com.br/"]}
          />

          <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>

        <MobileFooter
          onSupport={() => window.open("https://wa.me/5511933357047?text=Olá…")}
          onSearchOpen={() => document.querySelector<HTMLInputElement>("input[placeholder*='Buscar']")?.focus()}
          onMenuToggle={() => setMenuOpen(o => !o)}
        />
      </div>
    </EstabelecimentosProvider>
  );
}
