import React from 'react';
import { Fuel, ArrowRight } from 'lucide-react';

const WelcomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-6">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-yellow-400 rounded-3xl p-4 shadow-lg">
                        <Fuel size={56} className="text-white w-full h-full" />
                    </div>
                </div>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Bem-vindo a <span className="text-cyan-600">Megavale</span>
                </h1>

                {/* Frase */}
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                    Encontre postos credenciados da rede Frota Good Card de forma rápida e fácil
                </p>

                {/* Botão */}
                <button className="inline-flex items-center gap-3 bg-gradient-to-br from-orange-500 to-pink-500 text-white px-10 py-5 rounded-2xl hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span>Acessar Rede Credenciada</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;