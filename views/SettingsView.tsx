
import React from 'react';
import { UserProfile } from '../types';
import { Crown, Edit, LogOut, Shield, User as UserIcon } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
  isPremium: boolean;
  onEditProfile: () => void;
  onPremiumClick: () => void;
  onLogout: () => void;
  onOpenPrivacy: () => void;
}

export const SettingsView: React.FC<Props> = ({ userProfile, isPremium, onEditProfile, onPremiumClick, onLogout, onOpenPrivacy }) => {
  return (
    <div className="min-h-screen bg-black p-6 pb-32 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-8 pt-2">Perfil</h1>

      <div className="flex items-center gap-4 mb-8">
        {userProfile.picture ? (
          <img 
            src={userProfile.picture} 
            alt={userProfile.name} 
            className="w-20 h-20 rounded-full border-2 border-neon object-cover shadow-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-dark-gray rounded-full flex items-center justify-center border-2 border-neon text-2xl font-bold text-white uppercase">
              {userProfile.name.charAt(0)}
          </div>
        )}
        <div>
            <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
            <p className="text-gray-500 text-xs mb-1 truncate max-w-[200px]">{userProfile.email}</p>
            <p className="text-neon text-xs font-bold uppercase tracking-wider">{userProfile.goal} • {userProfile.level}</p>
        </div>
      </div>

      {!isPremium ? (
          <div onClick={onPremiumClick} className="bg-gradient-to-r from-neon/20 to-emerald-900/20 p-6 rounded-2xl border border-neon/30 mb-8 cursor-pointer active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                  <div className="bg-neon/20 p-3 rounded-full text-neon">
                      <Crown size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-white">Seja Premium</h3>
                      <p className="text-sm text-gray-400">Desbloqueie todo o potencial da IA.</p>
                  </div>
              </div>
          </div>
      ) : (
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-4 rounded-2xl border border-purple-500/30 mb-8">
            <div className="flex items-center gap-3">
                <Crown className="text-purple-400 w-6 h-6" />
                <div>
                    <h3 className="font-bold text-white">Membro Premium</h3>
                    <p className="text-xs text-gray-400">Acesso ilimitado vinculado ao seu email</p>
                </div>
            </div>
        </div>
      )}

      <div className="space-y-4">
        <button onClick={onEditProfile} className="w-full bg-dark-gray p-4 rounded-xl flex items-center justify-between text-white hover:bg-gray-800 transition-colors border border-white/5 shadow-sm">
            <div className="flex items-center gap-3">
                <Edit className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Editar Dados Corporais</span>
            </div>
        </button>
        
        <div className="p-4 bg-dark-gray rounded-xl space-y-4 border border-white/5 shadow-inner">
            <div className="flex justify-between text-sm border-b border-white/5 pb-3">
                <span className="text-gray-400">Idade</span>
                <span className="text-white font-bold">{userProfile.age} anos</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/5 pb-3">
                <span className="text-gray-400">Peso</span>
                <span className="text-white font-bold">{userProfile.weight} kg</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Altura</span>
                <span className="text-white font-bold">{userProfile.height || '--'} cm</span>
            </div>
        </div>

        <button onClick={onOpenPrivacy} className="w-full bg-dark-gray p-4 rounded-xl flex items-center gap-3 text-gray-400 hover:bg-gray-800 transition-colors border border-white/5">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Política de Privacidade</span>
        </button>

        <button onClick={onLogout} className="w-full bg-red-900/20 p-4 rounded-xl flex items-center justify-center gap-3 text-red-400 hover:bg-red-900/30 transition-colors border border-red-500/10 mt-8">
            <LogOut className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-xs">Sair da Conta</span>
        </button>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-gray-600 text-xs">FitScan Brasil v1.3.0</p>
        <p className="text-gray-700 text-[10px] mt-1">Conectado via Google Cloud Identity</p>
      </div>
    </div>
  );
};
