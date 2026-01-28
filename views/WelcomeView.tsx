
import React, { useEffect } from 'react';
import { Camera, Zap, Play, ShieldCheck } from 'lucide-react';

interface Props {
  onStart: () => void;
  onOpenPrivacy: () => void;
  onGoogleLogin: (response: any) => void;
  onGuestLogin: () => void;
}

export const WelcomeView: React.FC<Props> = ({ onOpenPrivacy, onGoogleLogin }) => {
  useEffect(() => {
    const google = (window as any).google;
    if (google) {
      try {
        google.accounts.id.initialize({
          client_id: "891465223788-29h8o04idntk957t2re7g6ivm4h382m9.apps.googleusercontent.com",
          callback: onGoogleLogin,
          auto_select: false,
        });
        google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          { 
            theme: "filled_black", 
            size: "large", 
            width: 320, 
            text: "signin_with", 
            shape: "pill" 
          }
        );
      } catch (e) {
        console.error("Erro ao inicializar Google Auth", e);
      }
    }
  }, [onGoogleLogin]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between py-12 px-8 relative overflow-hidden font-sans">
      {/* Glow de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-1/2 bg-neon/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
        {/* Ícone da Câmera no Box Escuro (Logo) */}
        <div className="bg-[#121212] p-8 rounded-[2.5rem] mb-10 border border-white/5 shadow-2xl">
          <Camera className="text-neon w-12 h-12" />
        </div>

        {/* Títulos FITSCAN BRASIL */}
        <div className="text-center mb-4">
          <h1 className="text-white font-[900] text-5xl tracking-tighter leading-none mb-1">FITSCAN</h1>
          <h1 className="text-neon font-[900] text-5xl tracking-tighter leading-none">BRASIL</h1>
        </div>

        {/* Descrição */}
        <p className="text-gray-400 text-sm text-center max-w-[240px] leading-relaxed mb-12">
          Sua inteligência artificial de treino, direto no navegador.
        </p>

        {/* Cards de Recursos */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-16">
          <div className="bg-[#121212] p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3">
            <Zap className="text-neon w-5 h-5" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Scanear IA</span>
          </div>
          <div className="bg-[#121212] p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3">
            <Play className="text-neon w-5 h-5" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Treinos Reais</span>
          </div>
        </div>
      </div>

      {/* Área de Ação: Google Login */}
      <div className="w-full max-w-xs z-10 flex flex-col items-center gap-8">
        <div id="googleBtn" className="w-full flex justify-center scale-110"></div>
        
        {/* Rodapé */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] text-gray-700 font-black tracking-[0.25em] uppercase">FitScanBrasil.com.br</p>
          <button 
            onClick={onOpenPrivacy}
            className="text-gray-800 text-[10px] flex items-center gap-1 hover:text-gray-500 transition-colors"
          >
            <ShieldCheck size={10} /> Termos de Uso
          </button>
        </div>
      </div>
    </div>
  );
};
