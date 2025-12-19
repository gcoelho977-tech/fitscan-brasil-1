import React from 'react';
import { Button } from './Button';
import { Crown, Lock, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  type: 'scan' | 'workout' | null;
  onClose: () => void;
  onUpgrade: () => void;
}

export const LimitModal: React.FC<Props> = ({ isOpen, type, onClose, onUpgrade }) => {
  if (!isOpen || !type) return null;

  const config = {
    scan: {
      title: "Limite de Scans Atingido",
      description: "Você atingiu seu limite diário de 2 análises de máquinas.",
      icon: <CameraIcon className="w-12 h-12 text-neon" />
    },
    workout: {
      title: "Limite de Treinos Atingido",
      description: "Você atingiu seu limite diário de 1 treino gerado por IA.",
      icon: <DumbbellIcon className="w-12 h-12 text-neon" />
    }
  };

  const content = config[type];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-gray w-full max-w-sm rounded-2xl border border-neon/30 shadow-[0_0_30px_rgba(0,255,136,0.15)] relative overflow-hidden flex flex-col">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center mb-6 border border-neon/20">
             <Lock className="w-10 h-10 text-neon" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{content.title}</h3>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            {content.description} <br/>
            <span className="text-neon block mt-2">Atualize para Premium para acesso ilimitado.</span>
          </p>

          <div className="w-full space-y-3">
            <Button onClick={onUpgrade} fullWidth className="shadow-lg shadow-neon/20">
              <Crown className="w-4 h-4 fill-black" /> Desbloquear Ilimitado
            </Button>
            <Button onClick={onClose} variant="outline" fullWidth className="border-gray-700 text-gray-400">
              Agora não
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icons for internal use
const CameraIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);

const DumbbellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>
);
