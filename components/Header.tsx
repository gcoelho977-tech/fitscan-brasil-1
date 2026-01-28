import React from 'react';
import { Camera, Dumbbell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-dark-gray/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/5">
      <div className="flex items-center gap-2">
        <Camera className="text-neon w-6 h-6" />
        <span className="text-xl font-bold tracking-tighter">FitScan<span className="text-neon">Brasil</span></span>
      </div>
      <button onClick={onMenuClick} className="text-white/80 hover:text-white">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};