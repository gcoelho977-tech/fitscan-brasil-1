
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { UserProfile, UserLevel, UserGoal } from '../types';
import { ChevronRight, ShieldAlert, Check } from 'lucide-react';

interface Props {
  onComplete: (profile: UserProfile) => void;
  initialData?: UserProfile | null;
}

export const ProfileSetupView: React.FC<Props> = ({ onComplete, initialData }) => {
  const [step, setStep] = useState(1);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    name: '',
    weight: '',
    height: '',
    age: '',
    level: UserLevel.INICIANTE,
    goal: UserGoal.SAUDAVEL,
    usageHistory: []
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col">
      <div className="flex-1">
        <div className="w-full bg-dark-gray h-1 rounded-full mb-8 mt-4">
          <div 
            className="bg-neon h-1 rounded-full transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <h2 className="text-3xl font-bold mb-2 text-white">
          {initialData?.name ? 'Ajustar Perfil' : 'Seu Perfil IA'}
        </h2>
        <p className="text-gray-400 mb-8 text-sm">Dados técnicos para precisão da Inteligência Artificial.</p>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nome Completo</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full bg-dark-gray border border-gray-700 rounded-xl p-4 text-white focus:border-neon focus:outline-none transition-colors"
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Idade</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={e => handleChange('age', e.target.value)}
                  className="w-full bg-dark-gray border border-gray-700 rounded-xl p-4 text-white focus:border-neon"
                  placeholder="anos"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Peso (kg)</label>
                <input 
                  type="number" 
                  value={formData.weight}
                  onChange={e => handleChange('weight', e.target.value)}
                  className="w-full bg-dark-gray border border-gray-700 rounded-xl p-4 text-white focus:border-neon"
                  placeholder="kg"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 animate-fade-in">
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Seu nível atual</label>
             {Object.values(UserLevel).map(level => (
               <button
                key={level}
                onClick={() => handleChange('level', level)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center ${
                  formData.level === level 
                    ? 'bg-neon/10 border-neon text-white' 
                    : 'bg-dark-gray border-transparent text-gray-500'
                }`}
               >
                 <span className="font-bold">{level}</span>
                 {formData.level === level && <div className="w-2 h-2 bg-neon rounded-full" />}
               </button>
             ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
             <div className="space-y-3">
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Objetivo</label>
               {Object.values(UserGoal).map(goal => (
                 <button
                  key={goal}
                  onClick={() => handleChange('goal', goal)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center ${
                    formData.goal === goal 
                      ? 'bg-neon/10 border-neon text-white' 
                      : 'bg-dark-gray border-transparent text-gray-500'
                  }`}
                 >
                   <span className="font-bold">{goal}</span>
                   {formData.goal === goal && <div className="w-2 h-2 bg-neon rounded-full" />}
                 </button>
               ))}
             </div>

             {/* Play Store Mandatory Medical Disclaimer */}
             <div 
              onClick={() => setHasAcceptedTerms(!hasAcceptedTerms)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${hasAcceptedTerms ? 'bg-neon/5 border-neon/30' : 'bg-red-500/5 border-red-500/20'}`}
             >
                <div className={`w-6 h-6 rounded flex items-center justify-center border shrink-0 transition-colors ${hasAcceptedTerms ? 'bg-neon border-neon' : 'bg-transparent border-gray-700'}`}>
                  {hasAcceptedTerms && <Check className="text-black w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold flex items-center gap-1">
                    <ShieldAlert size={14} className="text-yellow-500" /> Aviso Importante
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-tight mt-1">
                    Compreendo que este app fornece orientações por IA e não substitui consulta médica ou de um personal trainer presencial. Concordo em treinar com cautela.
                  </p>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="pt-6">
        <Button onClick={handleNext} fullWidth disabled={
          (step === 1 && (!formData.name || !formData.age || !formData.weight)) ||
          (step === 3 && !hasAcceptedTerms)
        }>
          {step === 3 ? "Finalizar Configuração" : "Próximo Passo"} <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
