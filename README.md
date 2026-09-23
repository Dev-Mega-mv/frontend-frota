
# 🚗 Cartão Frota - Localizador de Estabelecimentos

Este projeto é uma aplicação web desenvolvida com **Next.js**, **React**, **Tailwind CSS** e integração com a **API do Google Maps**, com o objetivo de exibir no mapa os estabelecimentos que aceitam o **Cartão Frota Megavale**.
---

## 🔧 Tecnologias Utilizadas
- [Next.js 13+](https://nextjs.org/)
- [React 18+](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api)
- [EmailJS](https://www.emailjs.com/) (para envio de sugestões e report de postos)
- TypeScript

---

## 🗺️ Funcionalidades

### ✅ Geolocalização do Usuário
- Ao acessar o site, o navegador solicita a permissão de localização.
- Se aceita, a posição atual do usuário é capturada.
- Se negada, o mapa carrega com a visão do Brasil inteiro.

### ✅ Exibição no Google Maps
- Mapa integrado com a API do Google Maps.
- Mostra marcadores de postos credenciados.
- Marcador da localização atual do usuário.
- Marcador temporário quando realiza uma busca.

### ✅ Busca Inteligente
- Pesquisa por nome de cidades, ruas ou postos usando Autocomplete da API do Google.
- Quando seleciona um posto que já possui marcador, abre o card com informações.
- Se não existir um marcador, posiciona no local da busca.

### ✅ Informações e Interação
- Ao clicar em um marcador, abre um card com:
  - Nome do posto
  - Endereço
  - Botão para rota (Google Maps)
  - Botão para reportar erro ou enviar sugestão

### ✅ Envio de Sugestões/Report
- Formulário para indicar um novo posto ou reportar problemas.
- Envio diretamente para o e-mail da equipe via EmailJS.

### ✅ Interface Responsiva
- Navbar adaptável.
- Footer fixo no mobile com acesso rápido ao suporte, pesquisa e menu lateral.
- Sidebar lateral com:
  - Dúvidas frequentes
  - Fale Conosco (WhatsApp e E-mail)
  - Indicar Posto

---

## 📁 Estrutura de Arquivos

```
/src
│
├── app
│   ├── page.tsx              ← Página de boas-vindas
│   ├── map/page.tsx          ← Página principal com mapa
│   └── layout.tsx            ← Layout base com Script do Google Maps
│
├── components
│   ├── AdBanner/             ← Banner de anúncio centralizado
│   ├── Layout/               ← Navbar, Sidebar e MobileFooter
│   ├── MapContainer/         ← Componente do mapa
│   ├── SearchBar/            ← Barra de pesquisa com Autocomplete
│   ├── SuggestionModal/      ← Modal de sugestões e report
│
├── context
│   └── EstabelecimentosContext.tsx ← Contexto de gerenciamento dos markers
│
├── services
│   └── api.ts                ← Consumo da API de estabelecimentos
│
├── styles
│   └── globals.css           ← Estilos globais (Tailwind)
```

---

## 🔑 Como rodar o projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/cartao-frota.git
cd cartao-frota
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure as variáveis de ambiente em `.env.local`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_google
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

### 4. Execute o projeto:
```bash
npm run dev
```

Acesse `http://localhost:3000`

---

## 🔒 Requisitos da API
A API de estabelecimentos deve retornar um array de objetos no seguinte formato:

```json
[
  {
    "nome": "Posto BR",
    "lat": -23.5,
    "lng": -46.6,
    "endereco": "Rua Exemplo, 123"
  }
]
```

---

## 🤝 Contribuição
Sinta-se à vontade para abrir issues, propor melhorias ou contribuir com pull requests.

---

## 🏢 Megavale Card © 2025
