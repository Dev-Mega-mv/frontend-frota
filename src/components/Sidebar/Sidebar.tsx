"use client";

import { FC, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronDown,
  ChevronUp,
  Fuel,
  Headset,
  Mail,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { SuggestionModal } from "@/components/SuggestionModal/SuggestionModal";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: "Para que serve este aplicativo?",
    answer:
      "Este app permite consultar os postos de combustível credenciados onde o Cartão Megavale Frota Good Card é aceito.",
  },
  {
    question: "Como faço para encontrar um posto credenciado?",
    answer:
      "Use a busca por localização ou ative o GPS no celular. O app mostrará os postos mais próximos de você.",
  },
  {
    question: "O app funciona offline?",
    answer:
      "Algumas funcionalidades básicas funcionam offline, mas para buscar postos atualizados é necessário conexão com internet.",
  },
  {
    question: "Como atualizo a lista de postos?",
    answer:
      "A lista é atualizada automaticamente quando você abre o app. Você também pode puxar para baixo para atualizar manualmente.",
  },
];

export const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const [openFaq, setOpenFaq] = useState(false);
  const [openIndique, setOpenIndique] = useState(false);
  const [openFale, setOpenFale] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl flex flex-col z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-[#fe415e] px-6 py-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 bg-white/20 rounded-full p-2">
              <Image
                src="/mega.jpeg"
                alt="Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Megavale</h2>
              <p className="text-yellow-100 text-sm">Frota Good Card</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* FAQs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <button
              onClick={() => setOpenFaq(!openFaq)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <HelpCircle size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-800">Dúvidas Frequentes</span>
                  <p className="text-sm text-gray-500">Respostas para perguntas comuns</p>
                </div>
              </div>
              {openFaq ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openFaq && (
              <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-4">
                {faqs.map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-start gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                      {item.question}
                    </h4>
                    <p className="text-sm text-gray-600 pl-4">{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Indique um posto */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => setOpenIndique(!openIndique)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-yellow-400 rounded-xl flex items-center justify-center">
                  <Fuel size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-800">Indique um Posto</span>
                  <p className="text-sm text-gray-500">Ajude a expandir nossa rede</p>
                </div>
              </div>
              {openIndique ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openIndique && (
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <button
                  onClick={() => setShowSuggestModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-orange-600 transition font-medium"
                >
                  <Mail size={16} /> Enviar Indicação
                </button>
              </div>
            )}
          </div>

          {/* Fale conosco */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => setOpenFale(!openFale)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Headset size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-800">Fale Conosco</span>
                  <p className="text-sm text-gray-500">Entre em contato com nosso suporte</p>
                </div>
              </div>
              {openFale ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openFale && (
              <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
                <a
                  href="https://wa.me/5511933357047?text=Olá,%20venho%20do%20aplicativo%20frota%20e%20preciso%20de%20suporte!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-600 transition"
                >
                  <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
                  <p className="font-medium">WhatsApp</p>
                  <ExternalLink size={16} className="ml-auto" />
                </a>
                <a
                  href="mailto:frota@megavalecard.com.br"
                  className="flex items-center gap-3 bg-cyan-500 text-white p-3 rounded-xl hover:bg-cyan-600 transition"
                >
                  <Mail size={20} />
                  <p className="font-medium">E-mail</p>
                  <ExternalLink size={16} className="ml-auto" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="bg-[#fe415e] rounded-lg p-4 text-white text-center">
            <p className="text-sm opacity-90 font-medium">Megavale Card © 2025</p>
            <p className="text-xs opacity-75">Versão 1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Modal de sugestão/report */}
      <SuggestionModal
        visible={showSuggestModal}
        onClose={() => setShowSuggestModal(false)}
        mode={openIndique ? "suggest" : "report"}
      />
    </>
  );
};

export default Sidebar;
