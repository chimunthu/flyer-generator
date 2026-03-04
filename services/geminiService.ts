import { FlyerData } from "../types";

const performGeneration = async (data: FlyerData, variant: 'A' | 'B'): Promise<string> => {
  const isLight = data.flyerTheme === 'light';

  // Vamos usar um MOCK SEGURO E LOCAL (Para não depender de redes externas protegidas)
  // Cria um SVG dinâmico simples e converte para Data URL
  const bgColor = variant === 'A' ? (isLight ? 'white' : '#000033') : (isLight ? '#f8fafc' : '#0f172a');
  const textColor = variant === 'A' ? (isLight ? '#000033' : 'white') : '#00cc44';
  const detailColor = variant === 'A' ? '#00cc44' : (isLight ? '#000033' : 'white');

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <radialGradient id="grad${variant}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:${detailColor};stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:${bgColor};stop-opacity:1" />
        </radialGradient>
      </defs>

      <rect width="1024" height="1024" fill="url(#grad${variant})" />
      <rect x="50" y="50" width="924" height="924" fill="none" stroke="${textColor}" stroke-width="4" stroke-dasharray="15, 15" opacity="0.5" />
      
      <circle cx="512" cy="350" r="120" fill="none" stroke="${detailColor}" stroke-width="8" opacity="0.8" />
      <circle cx="512" cy="350" r="100" fill="${detailColor}" opacity="0.2" />
      
      <text x="512" y="370" font-family="monospace" font-size="60" font-weight="bold" fill="${detailColor}" text-anchor="middle">I.A.</text>

      <text x="512" y="550" font-family="sans-serif" font-size="45" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="5">FLYER ${variant}</text>
      
      <text x="512" y="650" font-family="sans-serif" font-size="28" fill="${textColor}" text-anchor="middle" opacity="0.8">${data.title.substring(0, 45)}${data.title.length > 45 ? '...' : ''}</text>
      <text x="512" y="720" font-family="sans-serif" font-size="20" fill="${textColor}" text-anchor="middle" opacity="0.5">Estilo: ${variant === 'A' ? 'Corporativo' : 'Dinâmico'}</text>
      
      <text x="512" y="900" font-family="monospace" font-size="16" fill="${textColor}" text-anchor="middle" opacity="0.4">AMBIENTE DE TESTE OFFLINE | OFICINA DO FUTURO</text>
    </svg>
  `;

  // Simula o tempo de geração de 1.5s
  await new Promise(r => setTimeout(r, 1500));

  const base64Svg = btoa(unescape(encodeURIComponent(svgContent.trim())));
  return `data:image/svg+xml;base64,${base64Svg}`;
};

export const generateFlyerOptions = async (data: FlyerData): Promise<string[]> => {
  const [optionA, optionB] = await Promise.all([
    performGeneration(data, 'A'),
    performGeneration(data, 'B')
  ]);
  return [optionA, optionB];
};

export const refineFlyerImage = async (base64Image: string, instructions: string): Promise<string> => {
  // MOCK SEGURO E LOCAL PARA REFINAMENTO
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <rect width="1024" height="1024" fill="#050511" />
      <rect x="50" y="50" width="924" height="924" fill="none" stroke="#00cc44" stroke-width="10" />
      
      <circle cx="512" cy="350" r="100" fill="none" stroke="#00cc44" stroke-width="4" stroke-dasharray="10, 10" />
      <path d="M 462 350 L 532 300 L 532 400 Z" fill="#00cc44" opacity="0.5" />

      <text x="512" y="520" font-family="sans-serif" font-size="50" font-weight="bold" fill="#00cc44" text-anchor="middle" letter-spacing="4">ARTE REFINADA</text>
      <text x="512" y="620" font-family="sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.5">Alteração Aplicada:</text>
      
      <foreignObject x="112" y="680" width="800" height="200">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color: white; font-family: sans-serif; font-size: 28px; text-align: center; line-height: 1.5; font-style: italic;">
          "${instructions}"
        </div>
      </foreignObject>
    </svg>
  `;

  await new Promise(r => setTimeout(r, 1000));
  const base64Svg = btoa(unescape(encodeURIComponent(svgContent.trim())));
  return `data:image/svg+xml;base64,${base64Svg}`;
};
