// Unidades da TGT pelo mundo (mesmos dados do rodapé), com a posição no mapa e o fuso de cada cidade.

export type Unidade = {
  id: string;
  codigo: string; // código do país (ISO), usado para destacar o país no globo
  pais: string;
  cidade: string;
  sede?: boolean;
  lat: number;
  lng: number;
  fuso: string;
  endereco: string[];
  telefone: string;
  telefoneHref: string;
  email: string;
};

export const UNIDADES: Unidade[] = [
  {
    id: "americana",
    codigo: "BR",
    pais: "Brasil",
    cidade: "Americana, SP",
    sede: true,
    lat: -22.739,
    lng: -47.331,
    fuso: "America/Sao_Paulo",
    endereco: ["Rua das Poncianas, 669", "CEP 13468-180", "Americana/SP"],
    telefone: "(19) 99279-5271",
    telefoneHref:
      "https://wa.me/5519992795271?text=" +
      encodeURIComponent("Olá! Vi a TGT pelo mundo no site e quero falar com a unidade de Americana."),
    email: "contato@tgtmarketing.com.br",
  },
  {
    id: "buenos-aires",
    codigo: "AR",
    pais: "Argentina",
    cidade: "Buenos Aires",
    lat: -34.622,
    lng: -58.401,
    fuso: "America/Argentina/Buenos_Aires",
    endereco: ["Calle Pichincha, 765", "San Cristóbal, Comuna 3", "Buenos Aires"],
    telefone: "+54 9 11 6477-7066",
    telefoneHref:
      "https://wa.me/5491164777066?text=" +
      encodeURIComponent("¡Hola! Me gustaría hablar con TGT Buenos Aires."),
    email: "contactoarg@tgtmarketing.com.br",
  },
  {
    id: "medford",
    codigo: "US",
    pais: "Estados Unidos",
    cidade: "Medford, MA",
    lat: 42.418,
    lng: -71.107,
    fuso: "America/New_York",
    endereco: ["236 Main St", "ZIP Code 02155", "Medford, Massachusetts"],
    telefone: "+1 (781) 333-0708",
    telefoneHref:
      "https://wa.me/17813330708?text=" + encodeURIComponent("Hi! I would like to talk to TGT in Medford."),
    email: "contactoeua@tgtmarketing.com.br",
  },
  {
    id: "londres",
    codigo: "GB",
    pais: "Reino Unido",
    cidade: "Londres",
    lat: 51.517,
    lng: -0.156,
    fuso: "Europe/London",
    endereco: ["42 Baker Street", "Postcode NW1 6XE", "London, England"],
    telefone: "+44 7375 858464",
    telefoneHref:
      "https://wa.me/447375858464?text=" + encodeURIComponent("Hi! I would like to talk to TGT in London."),
    email: "contactouk@tgtmarketing.com.br",
  },
];

export const linkMapa = (u: Unidade) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.endereco.join(", ") + ", " + u.pais)}`;

export const horaLocal = (fuso: string) =>
  new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: fuso }).format(new Date());
