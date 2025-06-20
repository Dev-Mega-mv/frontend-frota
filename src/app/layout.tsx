import "@/app/styles/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Megavale",
  description: "Encontre estabelecimentos que aceitam o Cartão Frota",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.png" sizes="64x64" />
        <meta name="color-scheme" content="light" />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className="bg-white text-slate-800 overflow-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
