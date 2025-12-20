import React from 'react';
import { Button } from '../components/Button';
import { UserProfile } from '../types';
import { Play, Crown } from 'lucide-react';
import { Header } from '../components/Header';

interface Props {
  userProfile: UserProfile;
  isPremium?: boolean;
  onGenerateWorkout: () => void;
  onPremiumClick: () => void;
}

export const DashboardView: React.FC<Props> = ({ 
  userProfile, 
  isPremium = false,
  onGenerateWorkout,
  onPremiumClick
}) => {
  return (
    <div className="min-h-screen bg-black flex flex-col pb-32">
      <Header onMenuClick={onPremiumClick} />
      
      <div className="p-6 flex-1 animate-fade-in">
        <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Olá, {userProfile.name.split(' ')[0]} 👋</h1>
              <p className="text-gray-400 text-sm">Foco no objetivo: <span className="text-neon">{userProfile.goal}</span></p>
            </div>
            {isPremium && (
              <div className="bg-neon/10 px-3 py-1 rounded-full border border-neon/30 flex items-center gap-2">
                <Crown className="w-4 h-4 text-neon fill-neon" />
                <span className="text-neon text-xs font-bold uppercase">Premium</span>
              </div>
            )}
        </div>

        {/* Main Action Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Play className="w-32 h-32 text-white fill-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 relative z-10">Treino de Hoje</h2>
            <p className="text-gray-400 text-sm mb-6 relative z-10 max-w-[80%]">
                Sua rotina personalizada está pronta para ser gerada. Vamos começar?
            </p>
            <Button onClick={onGenerateWorkout} fullWidth className="relative z-10">
                <Play className="w-4 h-4 fill-black" /> Gerar Treino com IA
            </Button>
        </div>

        {/* Content placeholder to make the dashboard feel full */}
        <h3 className="text-white font-bold mb-4">Dicas Rápidas</h3>
        <div className="space-y-4 mb-6">
            <div className="bg-dark-gray p-4 rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xl">💧</div>
                <div>
                    <h4 className="text-white font-bold text-sm">Hidratação</h4>
                    <p className="text-xs text-gray-400">Beba pelo menos 2L de água hoje.</p>
                </div>
            </div>
            <div className="bg-dark-gray p-4 rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xl">😴</div>
                <div>
                    <h4 className="text-white font-bold text-sm">Descanso</h4>
                    <p className="text-xs text-gray-400">Durma 7-8h para recuperação muscular.</p>
                </div>
            </div>
        </div>

        {/* Premium Teaser - Only show if NOT premium */}
        {!isPremium && (
          <div onClick={onPremiumClick} className="bg-gradient-to-r from-neon/10 to-emerald-900/20 p-4 rounded-xl border border-neon/30 cursor-pointer hover:bg-neon/15 transition-colors">
              <div className="flex justify-between items-center">
                  <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                         <Crown className="w-4 h-4 text-neon" /> Seja Premium
                      </h4>
                      <p className="text-xs text-gray-400">Desbloqueie recursos ilimitados</p>
                  </div>
                  <span className="text-neon text-xs font-bold">
                      VER PLANOS &rarr;
                  </span>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};