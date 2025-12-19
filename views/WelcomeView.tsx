
import React from 'react';
import { Button } from '../components/Button';
import { Camera, Zap, ShieldCheck, Play } from 'lucide-react';

interface Props {
  onStart: () => void;
  onOpenPrivacy: () => void;
}

export const WelcomeView: React.FC<Props> = ({ onStart, onOpenPrivacy }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-72 h-72 bg-neon/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full"></div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-10 z-10 text-center pt-20">
        <div className="w-24 h-24 bg-gradient-to-br from-dark-gray to-black border border-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
          <Camera className="text-neon w-12 h-12" />
        </div>
        
        <h1 className="text-6xl font-black mb-2 tracking-tighter text-white">
          FITSCAN<br/><span className="text-neon">BRASIL</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-12 max-w-[280px] leading-tight">
          Sua inteligência artificial de treino, direto no navegador.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
            <Zap className="text-neon w-6 h-6 mb-2" />
            <span className="text-[10px] uppercase font-bold text-gray-400">Scanner IA</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
            <Play className="text-neon w-6 h-6 mb-2" />
            <span className="text-[10px] uppercase font-bold text-gray-400">Treinos Reais</span>
          </div>
        </div>
      </div>

      <div className="p-10 z-10 space-y-6">
        <Button onClick={onStart} fullWidth className="text-xl py-6 shadow-[0_0_40px_rgba(0,255,136,0.15)]">
          CRIAR MEU TREINO <Play className="w-5 h-5 fill-current ml-2" />
        </Button>
        
        <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">FitScanBrasil.com.br</p>
            <button 
                onClick={onOpenPrivacy}
                className="text-gray-700 text-[10px] hover:text-gray-400 flex items-center gap-1"
            >
                <ShieldCheck className="w-3 h-3" /> Termos de Uso
            </button>
        </div>
      </div>
    </div>
  );
};
