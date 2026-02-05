
export type ThemeMode = 'dark' | 'light';

export interface FlyerData {
  title: string;
  subtitle: string;
  learningPoints: string[];
  audience: string;
  requirements: string;
  date: string;
  time: string;
  imageDescription: string;
  hasPartner: boolean;
  partnerName?: string;
  flyerTheme: ThemeMode;
}

export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
  generatedImages: string[];
}
