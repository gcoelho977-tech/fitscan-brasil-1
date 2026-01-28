
import React from 'react';
import { Check, X, Star, Crown } from 'lucide-react';
import { Button } from '../components/Button';
import { PAYMENT_LINKS } from '../services/stripeService';

interface Props {
  onClose: () => void;
}

export const PremiumView: React.FC<Props> = ({ onClose }) => {
  const handleSubscribe = (url: string) => {
    // Redirecionamento forçado via JS para evitar problemas de iframe/sandbox
    window.location.assign(url);
  };

  return (
    <div className="min-h-screen bg-black relative p-6 overflow-y-auto pb-24">
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-10 p-2">
        <X className="w-8 h-8" />
      </button>

      <div className="mt-12 text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 px-4 py-1 rounded-full mb-4">
          <Crown className="w-4 h-4 text-neon fill-neon" />
          <span className="text-neon font-bold text-xs tracking-widest uppercase">Plano Digital</span>
        </div>
        <h1 className="text-4xl font-black text-white leading-none mb-4">
          EVOLUÇÃO<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">ILIMITADA</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          Assine o FitScan Brasil e leve sua inteligência de treino para o próximo nível.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/5 mb-8">
        <div className="grid grid-cols-1 gap-4">
          {[
            "Análise de máquinas ilimitada",
            "Gerador de treinos IA completo",
            "Consultoria de Dieta & Macros",
            "Histórico detalhado de progresso",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-neon rounded-full p-1 shadow-[0_0_10px_rgba(0,255,136,0.2)]">
                <Check className="w-3 h-3 text-black font-bold" />
              </div>
              <span className="text-gray-300 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <div className="relative transform active:scale-95 transition-transform">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon to-[#00CC6A] text-black text-[9px] font-black px-4 py-1 rounded-full z-10 shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-black" /> RECOMENDADO
          </div>
          <button 
            onClick={() => handleSubscribe(PAYMENT_LINKS.MONTHLY)}
            className="w-full bg-white/5 backdrop-blur-md border-2 border-neon/50 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden group text-left"
          >
            <div className="relative z-10">
              <div className="text-white font-black text-xl">MENSAL</div>
              <div className="text-[10px] text-neon font-bold uppercase tracking-tighter">Flexibilidade total</div>
            </div>
            <div className="relative z-10 text-right">
              <div className="text-gray-500 text-xs line-through">R$ 29,90</div>
              <div className="text-white font-black text-2xl">R$ 14,90</div>
            </div>
          </button>
        </div>

        <button 
          onClick={() => handleSubscribe(PAYMENT_LINKS.ANNUAL)}
          className="w-full bg-dark-gray/40 border border-white/5 rounded-2xl p-6 flex justify-between items-center hover:bg-white/5 transition-all text-left"
        >
           <div>
              <div className="text-white font-bold">ANUAL</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-tighter font-bold">Mais Econômico</div>
          </div>
          <div className="text-white font-black text-xl">
            R$ 99,90
          </div>
        </button>
      </div>

      <div className="px-2">
        <p className="text-center text-gray-600 text-[9px] mb-4 uppercase tracking-[0.2em]">
          Ambiente Seguro FitScan • Stripe Verified
        </p>
        <Button 
          onClick={() => handleSubscribe(PAYMENT_LINKS.MONTHLY)}
          fullWidth 
          className="py-5 font-black tracking-widest"
        >
          ASSINAR AGORA
        </Button>
      </div>
    </div>
  );
};
