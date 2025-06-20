"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { fetchEstabelecimentos } from "@/services/api";
import { MarkerType } from "@/types/marker";

interface EstContextType {
  markers: MarkerType[];
  loading: boolean;
  selectedMarker: MarkerType | null;
  setSelectedMarker: (m: MarkerType | null) => void;
}

const EstContext = createContext<EstContextType | undefined>(undefined);

export const EstabelecimentosProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(
    null
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchEstabelecimentos(); // chama GET http://localhost:3333/estabelecimentos
      setMarkers(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <EstContext.Provider
      value={{ markers, loading, selectedMarker, setSelectedMarker }}
    >
      {children}
    </EstContext.Provider>
  );
};

export function useEstabelecimentos() {
  const ctx = useContext(EstContext);
  if (!ctx)
    throw new Error(
      "useEstabelecimentos must be used within an EstabelecimentosProvider"
    );
  return ctx;
}