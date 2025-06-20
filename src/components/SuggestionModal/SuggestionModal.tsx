"use client";

import { FC, useState, FormEvent } from "react";
import { MarkerType } from "@/types/marker";
import emailjs from "emailjs-com";

export interface SuggestionModalProps {
    visible: boolean;
    onClose: () => void;
    marker?: MarkerType;
    mode?: "report" | "suggest";
}

export const SuggestionModal: FC<SuggestionModalProps> = ({
    visible,
    onClose,
    marker,
    mode = "report",
}) => {
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    if (!visible) return null;

    const title =
        mode === "suggest" ? "Indicar Posto" : "Reportar Posto";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setSending(true);

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    posto_nome: data.get("posto_nome"),
                    endereco: data.get("endereco"),
                    observacao: data.get("observacao"),
                    tipo: mode,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setSuccess(true);
            form.reset();
        } catch (err) {
            console.error(err);
            setError("Falha ao enviar. Tente novamente.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-lg shadow-xl w-[90vw] max-w-md p-6 z-10">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                        Enviado com sucesso!
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nome do Posto *</label>
                        <input
                            name="posto_nome"
                            type="text"
                            defaultValue={marker?.nome}
                            required
                            className="mt-1 w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Endereço</label>
                        <input
                            name="endereco"
                            type="text"
                            defaultValue={marker?.endereco}
                            className="mt-1 w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Observação ou Sugestão *
                        </label>
                        <textarea
                            name="observacao"
                            required
                            className="mt-1 w-full border rounded px-3 py-2"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        className={`w-full py-2 rounded text-white font-semibold transition ${sending
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#fe415e] hover:bg-[#e63555]"
                            }`}
                    >
                        {sending ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            </div>
        </div>
    );
};
