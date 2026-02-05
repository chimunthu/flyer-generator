
import React, { useState } from 'react';

interface FlyerPreviewProps {
  images: string[];
  error: string | null;
  onRefine: (index: number, instructions: string) => Promise<void>;
  isRefining: boolean;
}

const FlyerPreview: React.FC<FlyerPreviewProps> = ({ images, error, onRefine, isRefining }) => {
  const [refinementIndex, setRefinementIndex] = useState<number | null>(null);
  const [instructions, setInstructions] = useState('');

  const handleRefineSubmit = async (index: number) => {
    if (!instructions.trim()) return;
    await onRefine(index, instructions);
    setRefinementIndex(null);
    setInstructions('');
  };

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-red-400 text-center">
        <p className="font-bold mb-2">Erro na Geração</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="bg-slate-900/30 border-2 border-dashed border-white/10 p-12 rounded-3xl flex flex-col items-center justify-center text-gray-500 min-h-[500px]">
        <div className="relative w-20 h-20 mb-6 opacity-20">
           <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-3"></div>
           <div className="absolute inset-0 bg-green-500 rounded-lg -rotate-3 border-4 border-slate-900"></div>
        </div>
        <p className="text-center max-w-xs font-medium">Configure os dados do evento e gere duas opções de flyers profissionais instantaneamente.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {images.map((img, idx) => (
        <div key={idx} className="group relative space-y-4">
          <div className="absolute -top-3 -left-3 bg-[#00cc44] text-black px-4 py-1 rounded-full text-xs font-black z-10 shadow-lg">
            OPÇÃO {idx + 1}
          </div>
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
            <img 
              src={img} 
              alt={`Flyer Option ${idx + 1}`} 
              className="w-full h-auto rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <a 
                href={img} 
                download={`oficina-futuro-flyer-${idx + 1}.png`}
                className="flex items-center justify-center gap-2 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#00cc44] transition-colors"
              >
                BAIXAR
              </a>
              <button 
                onClick={() => setRefinementIndex(refinementIndex === idx ? null : idx)}
                disabled={isRefining}
                className={`flex items-center justify-center gap-2 py-3 border-2 border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all ${refinementIndex === idx ? 'bg-white/10 border-white/40' : 'hover:bg-white/5'}`}
              >
                {isRefining && refinementIndex === idx ? 'PROCESSANDO...' : 'AJUSTAR ARTE'}
              </button>
            </div>

            {refinementIndex === idx && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <textarea
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-[#00cc44] min-h-[80px]"
                  placeholder="Ex: 'Mude a cor do título para azul neon e aumente o robô no centro'..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleRefineSubmit(idx)}
                    disabled={isRefining || !instructions.trim()}
                    className="flex-1 py-2 bg-[#00cc44] text-black font-bold text-[10px] uppercase rounded-lg disabled:opacity-50"
                  >
                    CONFIRMAR AJUSTE
                  </button>
                  <button
                    onClick={() => {setRefinementIndex(null); setInstructions('');}}
                    className="px-4 py-2 border border-white/10 text-gray-400 font-bold text-[10px] uppercase rounded-lg"
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlyerPreview;
