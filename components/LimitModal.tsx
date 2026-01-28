
import React from 'react';
import { Button } from './Button';
import { Crown, Lock, X, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  type: 'scan' | 'workout' | null;
  isPremium?: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const LimitModal: React.FC<Props> = ({ isOpen, type, isPremium, onClose, onUpgrade }) => {
  if (!isOpen || !type) return null;

  const isFreeLimit = !isPremium;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-fade-in">
      <div className="bg-dark-gray w-full max-w-sm rounded-3xl border border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.15)] relative overflow-hidden flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2">
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 border border-yellow-500/20">
             {isFreeLimit ? <Lock className="w-10 h-10 text-yellow-500" /> : <AlertCircle className="w-10 h-10 text-orange-500" />}
          </div>

          <h3 className="text-xl font-black text-white mb-3">
            {isFreeLimit ? "Você atingiu seu limite gratuito diário" : "Limite Mensal Elite Atingido"}
          </h3>
          
          <p className="text-gray-400 mb-8 text-sm leading-relaxed px-2">
            {isFreeLimit 
              ? "Sua conta gratuita permite 3 scans e 3 treinos por dia. No plano Premium você tem acesso a consultoria completa sem interrupções."
              : "Você utilizou todas as suas 150 ações mensais. Seu ciclo renovará em breve ou você pode entrar em contato com o suporte."}
          </p>

          <div className="w-full space-y-3">
            {isFreeLimit && (
              <Button onClick={onUpgrade} fullWidth className="bg-yellow-500 hover:bg-yellow-600 text-black py-5 shadow-xl shadow-yellow-500/10">
                <Crown className="w-4 h-4 fill-black" /> DESBLOQUEAR ACESSO ELITE
              </Button>
            )}
            <Button onClick={onClose} variant="outline" fullWidth className="border-white/5 text-gray-500 text-xs py-3">
              VOLTAR AO INÍCIO
            </Button>
          </div>

          {isFreeLimit && (
             <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
               A partir de R$ 0,49 por dia
             </p>
          )}
        </div>
      </div>
    </div>
  );
};
