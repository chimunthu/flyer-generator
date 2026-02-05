
import React, { useState, useEffect } from 'react';
import FlyerForm from './components/FlyerForm';
import FlyerPreview from './components/FlyerPreview';
import { generateFlyerOptions, refineFlyerImage } from './services/geminiService';
import { FlyerData, GenerationState, ThemeMode } from './types';
import { LogoOficina, COLORS } from './constants';

const App: React.FC = () => {
  const [uiTheme, setUiTheme] = useState<ThemeMode>('dark');
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    error: null,
    generatedImages: [],
  });
  const [isRefining, setIsRefining] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = uiTheme === 'dark' ? COLORS.DARK_BG : COLORS.LIGHT_BG;
    document.body.style.color = uiTheme === 'dark' ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  }, [uiTheme]);

  const handleGenerateFlyer = async (data: FlyerData) => {
    setState({ ...state, isGenerating: true, error: null });
    try {
      const images = await generateFlyerOptions(data);
      setState({
        isGenerating: false,
        error: null,
        generatedImages: images,
      });
    } catch (err: any) {
      setState({
        isGenerating: false,
        error: err.message || "Ocorreu um erro ao processar as artes.",
        generatedImages: [],
      });
    }
  };

  const handleRefineFlyer = async (index: number, instructions: string) => {
    setIsRefining(true);
    try {
      const currentImage = state.generatedImages[index];
      const newImage = await refineFlyerImage(currentImage, instructions);
      
      const updatedImages = [...state.generatedImages];
      updatedImages[index] = newImage;
      
      setState({
        ...state,
        generatedImages: updatedImages,
        error: null
      });
    } catch (err: any) {
      setState({
        ...state,
        error: "Erro ao refinar imagem: " + (err.message || "Erro desconhecido")
      });
    } finally {
      setIsRefining(false);
    }
  };

  const isDark = uiTheme === 'dark';

  return (
    <div className="min-h-screen pb-12 transition-colors duration-500">
      {/* Navbar with official branding */}
      <nav className={`border-b ${isDark ? 'border-white/5 bg-[#000033]/80' : 'border-slate-200 bg-white/90'} backdrop-blur-xl sticky top-0 z-50 transition-all`}>
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          <LogoOficina theme={uiTheme} className="h-14" />
          
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <p className={`text-[10px] font-bold tracking-widest uppercase opacity-40`}>Creative Suite</p>
                <p className="text-xs font-black text-[#00cc44]">FLYER GENERATOR V2</p>
             </div>
             <button 
                onClick={() => setUiTheme(isDark ? 'light' : 'dark')}
                className={`p-3 rounded-xl border-2 transition-all ${isDark ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-800'}`}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Config Column */}
          <div className="lg:col-span-4 space-y-8">
            <header>
              <h1 className={`text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#000033]'}`}>
                CRIAR <span className="text-[#00cc44]">ARTE</span>
              </h1>
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Desenvolva flyers impactantes para os eventos da Oficina do Futuro. 
                Gere duas opções de design simultaneamente.
              </p>
            </header>
            
            <FlyerForm onSubmit={handleGenerateFlyer} isLoading={state.isGenerating} uiTheme={uiTheme} />
          </div>

          {/* Canvas Column */}
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#00cc44] tracking-[0.3em]">Exposição</span>
                <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-[#000033]'}`}>GALERIA DE RESULTADOS</h2>
              </div>
              {(state.isGenerating || isRefining) && (
                 <div className="flex items-center gap-3 bg-[#00cc44]/10 px-4 py-2 rounded-lg border border-[#00cc44]/30">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#00cc44] rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-[#00cc44] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#00cc44] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    </div>
                    <span className="text-[10px] font-black text-[#00cc44]">
                      {isRefining ? 'AJUSTANDO DETALHES...' : 'IA TRABALHANDO...'}
                    </span>
                 </div>
              )}
            </div>
            
            <FlyerPreview 
              images={state.generatedImages} 
              error={state.error} 
              onRefine={handleRefineFlyer}
              isRefining={isRefining}
            />
          </div>

        </div>
      </main>

      <footer className="mt-24 py-16 border-t border-white/5 flex flex-col items-center gap-6">
        <LogoOficina theme={uiTheme} className="h-10 grayscale opacity-30" />
        <p className={`text-[9px] font-bold tracking-[0.5em] uppercase ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
          Tecnologia para a Nova Geração de Talentos
        </p>
      </footer>
    </div>
  );
};

export default App;
