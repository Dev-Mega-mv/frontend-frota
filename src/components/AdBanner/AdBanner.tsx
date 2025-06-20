// src/components/AdBanner/AdBanner.tsx
"use client";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface AdBannerProps {
  /** URLs das imagens para exibir no carrossel */
  images: string[];
  /** URLs de destino para cada imagem, na mesma ordem */
  links?: string[];
}

export const AdBanner: FC<AdBannerProps> = ({
  images,
  links = [],
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exibe assim que houver imagens
  useEffect(() => {
    if (images.length) setVisible(true);
  }, [images]);

  // Troca a imagem a cada 5 segundos
  useEffect(() => {
    if (!visible || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible, images.length]);

  if (!visible) return null;

  const dest = links[currentIndex] ?? "#";

  return (
    <div
      className={`
        fixed top-1/2 left-1/2
        transform -translate-x-1/2 -translate-y-1/2
        z-50
        w-[90vw]        /* até 90% da largura em mobile */
        sm:w-[75vw]     /* ≥640px: 75% */
        md:w-[60vw]     /* ≥768px: 60% */
        lg:w-[50vw]     /* ≥1024px:50% */
        xl:w-[40vw]     /* ≥1280px:40% */
        2xl:w-[35vw]    /* ≥1536px:35% */
      `}
    >
      {/* botão fechar */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition z-10"
        aria-label="Fechar anúncio"
      >
        <X size={20} className="text-gray-800" />
      </button>

      {/* imagem clicável */}
      <a href={dest} target="_blank" rel="noopener noreferrer">
        <div
          className={`
            relative w-full
            h-[70vw]       /* mobile: 65% da viewport height */
            sm:h-[55vw]    /* ≥640px:55% */
            md:h-[40vw]    /* ≥768px:40% */
            lg:h-[35vw]    /* ≥1024px:35% */
            xl:h-[30vw]    /* ≥1280px:30% */
            2xl:h-[25vw]   /* ≥1536px:25% */
          `}
        >
          <Image
            src={images[currentIndex]}
            alt={`Anúncio ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
      </a>
    </div>
  );
};
