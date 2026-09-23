"use client";

import { useRouter } from "next/navigation";
import { Fuel, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-yellow-400 rounded-3xl p-4 shadow-lg">
            <Fuel size={56} className="text-white w-full h-full" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Bem-vindo!
          {/*<span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-500 via-yellow-500 to-cyan-500">Megavale</span>*/}
        </h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Encontre postos credenciados da rede Megavale Frota de forma rápida e fácil
        </p>
        <button
          onClick={() => router.push("/map")}
          className="inline-flex items-center gap-3 bg-gradient-to-br from-orange-500 to-pink-500 text-white px-10 py-5 rounded-2xl hover:from-pink-500 hover:to-orange-500 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span>Acessar Rede Credenciada</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
