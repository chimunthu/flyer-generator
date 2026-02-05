
import React, { useState } from 'react';
import { FlyerData, ThemeMode } from '../types';

interface FlyerFormProps {
  onSubmit: (data: FlyerData) => void;
  isLoading: boolean;
  uiTheme: ThemeMode;
}

const FlyerForm: React.FC<FlyerFormProps> = ({ onSubmit, isLoading, uiTheme }) => {
  const isDark = uiTheme === 'dark';
  const [formData, setFormData] = useState<FlyerData>({
    title: 'DESENVOLVIMENTO INTELIGENTE',
    subtitle: 'WORKSHOP DE FERRAMENTAS E FRAMEWORKS DE I.A.',
    learningPoints: ['Conectar IA a dados (MCP)', 'Estruturar personas', 'Planejar raciocínios', 'Orquestrar Agentes'],
    audience: 'Desenvolvedores e entusiastas de IA',
    requirements: 'Conhecimento básico de programação',
    date: '24 DE JANEIRO',
    time: '08:30 H',
    imageDescription: 'A glowing futuristic brain with floating circuit diagrams and neon neural networks in 3D',
    hasPartner: false,
    partnerName: '',
    flyerTheme: 'dark'
  });

  const inputClass = `w-full ${isDark ? 'bg-slate-800 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-lg p-2 focus:ring-2 focus:ring-[#00ff41] outline-none transition-all`;
  const labelClass = `text-[10px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-widest mb-1 block`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-xl'} p-6 rounded-2xl border transition-colors`}>
      
      {/* Section 1: Branding & Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/5">
        <div>
          <label className={labelClass}>Estilo do Flyer</label>
          <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-lg gap-1">
            <button
              type="button"
              onClick={() => setFormData({...formData, flyerTheme: 'dark'})}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${formData.flyerTheme === 'dark' ? 'bg-[#00ff41] text-black shadow-sm' : 'text-gray-500'}`}
            >
              DARK MODE
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, flyerTheme: 'light'})}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${formData.flyerTheme === 'light' ? 'bg-[#00ff41] text-black shadow-sm' : 'text-gray-500'}`}
            >
              LIGHT MODE
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Título Principal</label>
          <input
            type="text"
            className={inputClass}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Section 2: Subtitle & Image */}
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Subtítulo (Faixa de Destaque)</label>
          <input
            type="text"
            className={inputClass}
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Conceito da Imagem IA</label>
          <textarea
            className={`${inputClass} h-20 resize-none`}
            value={formData.imageDescription}
            onChange={(e) => setFormData({ ...formData, imageDescription: e.target.value })}
            placeholder="Descreva a imagem central impactante..."
            required
          />
        </div>
      </div>

      {/* Section 3: Points & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className={labelClass}>O que aprenderão?</label>
          {formData.learningPoints.map((point, idx) => (
            <input
              key={idx}
              type="text"
              className={inputClass}
              value={point}
              onChange={(e) => {
                const newPoints = [...formData.learningPoints];
                newPoints[idx] = e.target.value;
                setFormData({...formData, learningPoints: newPoints});
              }}
            />
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Público Alvo</label>
            <input
              type="text"
              className={inputClass}
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Requisitos</label>
            <input
              type="text"
              className={inputClass}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Section 4: Schedule & Partners */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
        <div>
          <label className={labelClass}>Data do Evento</label>
          <input
            type="text"
            className={inputClass}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Horário</label>
          <input
            type="text"
            className={inputClass}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-end">
           <label className="flex items-center gap-2 cursor-pointer py-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[#00ff41] focus:ring-[#00ff41]"
                checked={formData.hasPartner}
                onChange={(e) => setFormData({ ...formData, hasPartner: e.target.checked })}
              />
              <span className="text-xs font-bold text-gray-500">LOGO PARCEIRO?</span>
           </label>
        </div>
      </div>

      {formData.hasPartner && (
        <div className="animate-in slide-in-from-top-2">
          <label className={labelClass}>Nome/Entidade do Parceiro</label>
          <input
            type="text"
            className={inputClass}
            value={formData.partnerName}
            onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest transition-all transform active:scale-[0.98] ${
          isLoading ? 'bg-slate-500 cursor-not-allowed text-white/50' : 'bg-[#00ff41] text-[#0a0f1d] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]'
        }`}
      >
        {isLoading ? 'GERANDO FLYER...' : 'GERAR FLYER PREMIUM'}
      </button>
    </form>
  );
};

export default FlyerForm;
