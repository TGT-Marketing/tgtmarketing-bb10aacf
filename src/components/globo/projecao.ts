// Mesma matemática de projeção da biblioteca do globo (cobe), para posicionar pinos, rotas e
// contornos de países por cima dele, e descobrir qual país está sob o mouse.

export const RAIO = 0.8; // raio do globo, na escala da biblioteca

export type Vetor = [number, number, number];

export const paraVetor = (lat: number, lng: number): Vetor => {
  const r = (lat * Math.PI) / 180;
  const a = (lng * Math.PI) / 180 - Math.PI;
  const o = Math.cos(r);
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)];
};

export type Vista = { phi: number; theta: number; aspecto: number; escala: number };

// Converte um ponto 3D (raio qualquer) para a posição na tela (0 a 1) e diz se está na frente do globo
export const projetar = (t: Vetor, v: Vista) => {
  const r = Math.cos(v.theta);
  const a = Math.cos(v.phi);
  const o = Math.sin(v.theta);
  const i = Math.sin(v.phi);
  const c = a * t[0] + i * t[2];
  const s = i * o * t[0] + r * t[1] - a * o * t[2];
  const d = -i * r * t[0] + o * t[1] + a * r * t[2];
  return {
    x: ((c / v.aspecto) * v.escala + 1) / 2,
    y: (-s * v.escala + 1) / 2,
    frente: d >= 0,
    visivel: d >= 0 || c * c + s * s >= RAIO * RAIO,
  };
};

// Caminho inverso: posição na tela (0 a 1) para latitude e longitude, ou null fora do globo
export const desprojetar = (fx: number, fy: number, v: Vista) => {
  const c = ((2 * fx - 1) * v.aspecto) / v.escala;
  const s = -(2 * fy - 1) / v.escala;
  const q = RAIO * RAIO - c * c - s * s;
  if (q < 0) return null;
  const d = Math.sqrt(q);
  const r = Math.cos(v.theta);
  const a = Math.cos(v.phi);
  const o = Math.sin(v.theta);
  const i = Math.sin(v.phi);
  const t0 = a * c + i * o * s - i * r * d;
  const t1 = r * s + o * d;
  const t2 = i * c - a * o * s + a * r * d;
  const lat = (Math.asin(Math.max(-1, Math.min(1, t1 / RAIO))) * 180) / Math.PI;
  let lng = (Math.atan2(t2, -t0) * 180) / Math.PI + 180;
  if (lng > 180) lng -= 360;
  return { lat, lng };
};

// Ângulos que deixam um ponto de frente para quem olha
export const angulosPara = (lat: number, lng: number) => ({
  phi: Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
  theta: (lat * Math.PI) / 180,
});

// Ponto dentro de polígono (anéis GeoJSON: o primeiro é a borda, os demais são buracos)
export const dentroDoPoligono = (lng: number, lat: number, aneis: number[][][]) => {
  let dentro = false;
  aneis.forEach((anel, k) => {
    let d = false;
    for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
      const [xi, yi] = anel[i];
      const [xj, yj] = anel[j];
      if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) d = !d;
    }
    if (k === 0) dentro = d;
    else if (d) dentro = false;
  });
  return dentro;
};
