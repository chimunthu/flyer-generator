
import { GoogleGenAI } from "@google/genai";
import { FlyerData } from "../types";

const performGeneration = async (data: FlyerData, variant: 'A' | 'B'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const isLight = data.flyerTheme === 'light';
  const bgColor = isLight ? "Pure White (#FFFFFF)" : "Deep Navy Blue (#000033)";
  const styleInstruction = variant === 'A' 
    ? "Modern Corporate: Large clean typography, ample white space, sharp 3D centered icon." 
    : "Dynamic Tech: Overlapping elements, glowing neon accents, asymmetric layout with bold tilted titles.";

  const prompt = `
    TASK: Create high-end graphic design for "Oficina do Futuro".
    THEME: ${data.flyerTheme.toUpperCase()} MODE.
    STYLE: ${styleInstruction}

    LOGO SPECIFICATIONS (TOP):
    - Must include the "Oficina do Futuro" official logo: A dark-colored gear with a bright neon green diagonal circuit line.
    - Slogans below logo: "Cultivando Talentos" and "Construindo Futuros" in neon green.

    EVENT CONTENT:
    - TITLE: "${data.title.toUpperCase()}". 
      Instruction: Make it extremely STYLISH. Use multi-layered effects, high-impact fonts, and ${isLight ? 'navy' : 'white'} colors with neon green shadows.
    - SUBTITLE: "${data.subtitle}" inside a thick vibrant neon green horizontal banner.
    - IMAGE: ${data.imageDescription}. (Render as high-quality 3D digital asset).

    DETAILS:
    - Lists: ${data.learningPoints.join(", ")}.
    - Footer Info: "${data.date} | ${data.time}".
    - Website: oficinadofuturo.org.mz

    AESTHETICS: Professional visual hierarchy, high fidelity, 4K render style.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  throw new Error("Falha na geração da imagem.");
};

export const generateFlyerOptions = async (data: FlyerData): Promise<string[]> => {
  if (!process.env.API_KEY) throw new Error("API Key não configurada.");
  const [optionA, optionB] = await Promise.all([
    performGeneration(data, 'A'),
    performGeneration(data, 'B')
  ]);
  return [optionA, optionB];
};

export const refineFlyerImage = async (base64Image: string, instructions: string): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API Key não configurada.");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Extract base64 data from data URL
  const base64Data = base64Image.split(',')[1];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/png',
          },
        },
        {
          text: `Please update this "Oficina do Futuro" flyer according to these instructions: ${instructions}. 
          Maintain the brand identity (Navy and Neon Green). Focus only on the requested changes.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  throw new Error("Falha ao refinar a imagem.");
};
