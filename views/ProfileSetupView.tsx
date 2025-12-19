import React, { useState } from 'react';
import { Button } from '../components/Button';
import { UserProfile, UserLevel, UserGoal } from '../types';
import { ChevronRight } from 'lucide-react';

interface Props {
  onComplete: (profile: UserProfile) => void;
  initialData?: UserProfile | null;
}

export const ProfileSetupView: React.FC<Props> = ({ onComplete, initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    name: '',
    weight: '',
    height: '',
    age: '',
    level: UserLevel.INICIANTE,
    goal: UserGoal.SAUDAVEL
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
          {initialData ? 'Editar Perfil' : 'Vamos te conhecer'}
        </h2>
        <p className="text-gray-400 mb-8">Para criar o treino perfeito para você.</p>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Seu Nome</label>
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
                <label className="block text-sm font-medium text-gray-400 mb-2">Idade</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={e => handleChange('age', e.target.value)}
                  className="w-full bg-dark-gray border border-gray-700 rounded-xl p-4 text-white focus:border-neon focus:outline-none"
                  placeholder="anos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Peso (kg)</label>
                <input 
                  type="number" 
                  value={formData.weight}
                  onChange={e => handleChange('weight', e.target.value)}
                  className="w-full bg-dark-gray border border-gray-700 rounded-xl p-4 text-white focus:border-neon focus:outline-none"
                  placeholder="kg"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Altura (cm)</label>
                <input 
                  type="number" 
                  value={formData.height}
                  onChange={e => handleChange('height', e.target.value)}
                  className="w-full bg-dark-gray border border-gray-700 rounded-xl p-4 text-white focus:border-neon focus:outline-none"
                  placeholder="cm"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
             <label className="block text-sm font-medium text-gray-400 mb-4">Nível de experiência</label>
             {Object.values(UserLevel).map(level => (
               <button
                key={level}
                onClick={() => handleChange('level', level)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center ${
                  formData.level === level 
                    ? 'bg-neon/10 border-neon text-white' 
                    : 'bg-dark-gray border-transparent text-gray-400 hover:bg-gray-800'
                }`}
               >
                 <span className="font-medium">{level}</span>
                 {formData.level === level && <div className="w-3 h-3 bg-neon rounded-full" />}
               </button>
             ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
             <label className="block text-sm font-medium text-gray-400 mb-4">Seu objetivo principal</label>
             {Object.values(UserGoal).map(goal => (
               <button
                key={goal}
                onClick={() => handleChange('goal', goal)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center ${
                  formData.goal === goal 
                    ? 'bg-neon/10 border-neon text-white' 
                    : 'bg-dark-gray border-transparent text-gray-400 hover:bg-gray-800'
                }`}
               >
                 <span className="font-medium">{goal}</span>
                 {formData.goal === goal && <div className="w-3 h-3 bg-neon rounded-full" />}
               </button>
             ))}
          </div>
        )}
      </div>

      <div className="pt-6">
        <Button onClick={handleNext} fullWidth disabled={
          (step === 1 && !formData.name) ||
          (step === 2 && !formData.level)
        }>
          {step === 3 ? "Salvar Perfil" : "Próximo"} <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};