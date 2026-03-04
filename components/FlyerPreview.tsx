
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

  return (
    <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-12 rounded-3xl flex flex-col items-center justify-center text-gray-500 min-h-[600px] shadow-2xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00cc44]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl rotate-6 opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#00cc44] to-teal-500 rounded-2xl -rotate-3 border-2 border-white/10 shadow-[0_0_30px_rgba(0,204,68,0.3)] backdrop-blur-md flex items-center justify-center">
          <svg className="w-10 h-10 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
      </div>
      <p className="text-center max-w-sm font-medium text-lg text-gray-300">Sua galeria de imagens aparecerá aqui.</p>
      <p className="text-center max-w-sm text-sm mt-2 text-gray-500">Configure os dados do painel lateral e solicite a criação.</p>
    </div>
  );


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
            <div className="grid grid-cols-2 gap-3">
              <a
                href={img}
                download={`oficina-futuro-flyer-${idx + 1}.png`}
                className="flex items-center justify-center gap-2 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#00cc44] hover:shadow-[0_0_20px_rgba(0,204,68,0.4)] transition-all duration-300"
              >
                BAIXAR
              </a>
              <button
                onClick={() => setRefinementIndex(refinementIndex === idx ? null : idx)}
                disabled={isRefining}
                className={`flex items-center justify-center gap-2 py-4 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300 ${refinementIndex === idx ? 'bg-white/10 border-white/30 backdrop-blur-md' : 'bg-slate-800/50 hover:bg-slate-700/50'}`}
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
                    onClick={() => { setRefinementIndex(null); setInstructions(''); }}
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
