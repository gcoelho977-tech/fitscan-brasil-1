import React from 'react';
import { Home, Dumbbell, Camera, TrendingUp, User } from 'lucide-react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onScan: () => void;
}

export const BottomNav: React.FC<Props> = ({ currentView, onNavigate, onScan }) => {
  const navItems = [
    { view: AppView.DASHBOARD, icon: Home, label: 'Início' },
    { view: AppView.WORKOUT, icon: Dumbbell, label: 'Treino' },
    { isScan: true, icon: Camera, label: 'Escanear' },
    { view: AppView.PROGRESS, icon: TrendingUp, label: 'Evolução' },
    { view: AppView.SETTINGS, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 px-6 py-4 pb-8 z-40 max-w-md mx-auto">
      <div className="flex justify-between items-end">
        {navItems.map((item, index) => {
          if (item.isScan) {
            return (
              <button
                key={index}
                onClick={onScan}
                className="relative -top-6 bg-neon text-black p-4 rounded-full shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:scale-105 transition-transform group"
              >
                <item.icon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>
            );
          }
          
          const Icon = item.icon;
          // @ts-ignore
          const isActive = currentView === item.view;
          
          return (
            <button
              key={index}
              // @ts-ignore
              onClick={() => item.view && onNavigate(item.view)}
              className={`flex flex-col items-center gap-1 transition-colors w-14 ${
                isActive ? 'text-neon' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {/* @ts-ignore */}
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-neon' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};