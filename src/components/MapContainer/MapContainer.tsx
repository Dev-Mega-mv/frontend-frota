"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMediaQuery } from "usehooks-ts";
import { useEstabelecimentos } from "@/context/EstabelecimentosContext";
import { fetchEstabelecimentosByRadius } from "@/services/api";
import { MarkerType } from "@/types/marker";
import { SuggestionModal } from "@/components/SuggestionModal/SuggestionModal";

const DEFAULT_RADIUS = 20_000; // 20 km
const BRAZIL_CENTER = { lat: -14.235004, lng: -51.92528 };  // centro aproximado do Brasil

interface Props {
  overrideCenter?: { lat: number; lng: number } | null;
}

export default function MapContainer({ overrideCenter }: Props) {
  const { selectedMarker, setSelectedMarker } = useEstabelecimentos();

  // 1) localização real do usuário
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  // 2) centro usado para buscar postos
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  // 3) lista de marcadores retornados pela API
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [loadingMarkers, setLoadingMarkers] = useState(true);
  // 4) estado de zoom dinâmico
  const [zoom, setZoom] = useState<number>(12);
  // 5) marker de busca (overrideCenter)
  const [searchMarker, setSearchMarker] = useState<{ lat: number; lng: number } | null>(null);
  // 6) controle do modal de sugestão/report
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  const isMobile = useMediaQuery("(max-width:1024px)");
  const navbarH = isMobile ? 72 : 80;
  const containerStyle = { width: "100%", height: `calc(100vh - ${navbarH}px)` };

  // 1) geolocalização
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        const loc = { lat: coords.latitude, lng: coords.longitude };
        setUserLocation(loc);
        setCenter(loc);
        setZoom(12);  // zoom padrão próximo
      },
      () => {
        // se negar, centraliza e afasta
        setCenter(BRAZIL_CENTER);
        setZoom(5);    // zoom afastado para mostrar quase todo o Brasil
      },
      { enableHighAccuracy: true }
    );
  }, []);


  // Quando o overrideCenter (vindo da SearchBar) mudar
  useEffect(() => {
    if (!overrideCenter) return;
    setSelectedMarker(null);
    setCenter(overrideCenter);
    setSearchMarker(overrideCenter);
    setZoom(15);
  }, [overrideCenter, setSelectedMarker]);

  // Busca os postos a cada mudança de center
  useEffect(() => {
    if (!center) return;
    setLoadingMarkers(true);
    fetchEstabelecimentosByRadius(center.lat, center.lng, DEFAULT_RADIUS)
      .then((data) => setMarkers(data))
      .finally(() => setLoadingMarkers(false));
  }, [center]);

  // Carrega Google Maps + Places (biblioteca fixa)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"] as const,
  });

  // Ícones customizados
  const postoIcon = useMemo(() => {
    if (!isLoaded || !window.google?.maps) return undefined;
    return {
      url: "/icons/posto-4.svg",
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
    };
  }, [isLoaded]);
  const userIcon = useMemo(() => {
    if (!isLoaded || !window.google?.maps) return undefined;
    return {
      url: "/icons/my-location.svg",
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
    };
  }, [isLoaded]);

  // Loading / errors
  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <span className="text-red-500">Erro ao carregar o mapa</span>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <span className="text-slate-500">Carregando mapa…</span>
      </div>
    );
  }
  if (loadingMarkers) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <span className="text-slate-500">Carregando postos…</span>
      </div>
    );
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center!}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: "greedy",
        }}
        onClick={() => {
          setSelectedMarker(null);
          setSearchMarker(null);
        }}
      >
        {/* Marcador do usuário real (só quando não há overrideCenter) */}
        {userLocation && !overrideCenter && (
          <Marker
            position={userLocation}
            icon={userIcon}
            zIndex={999}
            title="Você está aqui"
          />
        )}

        {/* Marcador provisório de busca */}
        {searchMarker && (
          <Marker
            position={searchMarker}
            icon={userIcon}
            zIndex={998}
            title="Local pesquisado"
          />
        )}

        {/* Marcadores de postos */}
        {markers.map((m, i) => (
          <Marker
            key={i}
            position={{ lat: m.lat, lng: m.lng }}
            icon={postoIcon}
            onClick={() => {
              setSelectedMarker(m);
              setSearchMarker(null);
              setZoom(14);
            }}
            title={m.nome}
          >
            {selectedMarker === m && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div
                  className={`
                    bg-white rounded-xl shadow-lg overflow-visible
                    w-full max-w-[90vw] sm:max-w-[20rem]
                  `}
                >
                  <div className="px-4 pt-3 pb-1 border-b border-gray-200">
                    <h3 className="text-base font-bold text-gray-800">
                      {m.nome}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {m.endereco}
                    </p>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#00ba7f] hover:bg-[#00a36b]
                                 text-white text-center font-semibold py-2 rounded-lg"
                    >
                      Ir até o local
                    </a>
                    {/* Botão que abre o formulário de report */}
                    <button
                      onClick={() => setShowSuggestModal(true)}
                      className="block w-full border-2 border-[#ff365b]
                                 text-[#ff365b] hover:bg-[#ffe2e8]
                                 text-center font-semibold py-2 rounded-lg"
                    >
                      Reportar Posto
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>

      {/* Modal de relatório/sugestão */}
      <SuggestionModal
        visible={showSuggestModal}
        onClose={() => setShowSuggestModal(false)}
        marker={selectedMarker ?? undefined}
      />
    </>
  );
}