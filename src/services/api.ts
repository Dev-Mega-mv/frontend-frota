import { MarkerType } from "@/types/marker";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchEstabelecimentosByRadius(
  lat: number,
  lng: number,
  radius: number
): Promise<MarkerType[]> {
  try {
    const url = `${BASE}/estabelecimentos?lat=${lat}&lng=${lng}&radius=${radius}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    const raw = (await res.json()) as Array<{
      nomeReduzido: string;
      latitude: string;
      longitude: string;
      novaCategoria: string;
      bairro: string;
      cep: string;
      logradouro: string;
      numero: string | null;
    }>;

    // 1) Filtra só "POSTOS DE COMBUSTÍVEIS"
    const apenasPostos = raw.filter(
      (r) => r.novaCategoria === "POSTOS DE COMBUSTÍVEIS"
    );

    // 2) Mapeia para o formato MarkerType
    return apenasPostos.map((r) => {
      const enderecoParts = [
        r.logradouro,
        r.numero,
        r.bairro,
        r.cep,
      ].filter(Boolean);

      return {
        nome: r.nomeReduzido,
        endereco: enderecoParts.join(", "),
        lat: parseFloat(r.latitude),
        lng: parseFloat(r.longitude),
        tipo: "posto",
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Alias para manter compatibilidade com o Provider
export const fetchEstabelecimentos = (
  lat = -20.813153,
  lng = -49.393445,
  radius = 20_000
) => fetchEstabelecimentosByRadius(lat, lng, radius);
