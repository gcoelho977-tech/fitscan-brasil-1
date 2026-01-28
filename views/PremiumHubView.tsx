
import React, { useState, useMemo } from 'react';
import { UserProfile, CompletedWorkout, UserGoal } from '../types';
import { 
  Crown, 
  MapPin, 
  Apple, 
  Utensils, 
  Flame,
  CheckCircle2,
  Zap,
  Star,
  ArrowUpRight,
  Play,
  History,
  TrendingUp,
  Activity,
  Droplets,
  Moon,
  Dumbbell
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  userProfile: UserProfile;
  history: CompletedWorkout[];
  onUpdateProfile: (data: Partial<UserProfile>) => void;
  onGenerateWorkout: () => void;
}

export const PremiumHubView: React.FC<Props> = ({ userProfile, history = [], onUpdateProfile, onGenerateWorkout }) => {
  const [dietPlan, setDietPlan] = useState<string | null>(null);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [dailyHabits, setDailyHabits] = useState({ water: false, sleep: false, protein: false });

  const stats = useMemo(() => {
    try {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
      const recent = history.filter(w => w && w.date && new Date(w.date) >= weekAgo);
      
      const goalMap: Record<string, number> = {
        [UserGoal.HIPERTROFIA]: 5,
        [UserGoal.EMAGRECER]: 6,
        [UserGoal.DEFINICAO]: 5,
        [UserGoal.SAUDAVEL]: 3,
        [UserGoal.RESISTENCIA]: 4,
      };

      const target = goalMap[userProfile.goal] || 4;
      const progress = Math.min((recent.length / target) * 100, 100);
      
      return {
        recentCount: recent.length,
        target,
        progress,
        isOnTrack: recent.length >= target * 0.7
      };
    } catch (e) {
      return { recentCount: 0, target: 4, progress: 0, isOnTrack: false };
    }
  }, [history, userProfile.goal]);

  const generateDiet = async () => {
    setIsGeneratingDiet(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Crie um plano alimentar ELITE hoje para ${userProfile.name}, foco ${userProfile.goal}. Use tabelas de macros técnicos.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setDietPlan(response.text || "");
    } catch (e) {
      setDietPlan("Erro ao gerar dieta.");
    } finally {
      setIsGeneratingDiet(false);
    }
  };

  const usageStats = useMemo(() => {
    const logs = userProfile.usageHistory || [];
    const now = new Date();
    const thisMonth = logs.filter(l => {
      const d = new Date(l.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    return { current: thisMonth.length, max: 150 };
  }, [userProfile.usageHistory]);

  return (
    <div className="min-h-screen bg-black pb-40 animate-fade-in text-white">
      {/* Header Premium */}
      <div className="p-6 pt-12 bg-gradient-to-b from-yellow-600/20 to-transparent">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full">
            <Crown className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-500 font-bold text-[10px] uppercase tracking-tighter">Membro Elite</span>
          </div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Ações do Mês: <span className="text-white">{usageStats.current}/{usageStats.max}</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-black mb-1">Central de <span className="text-yellow-500">Performance</span></h1>
        <p className="text-gray-400 text-sm italic">"O sucesso é a soma de pequenos esforços repetidos."</p>
      </div>

      <div className="px-6 space-y-6">
        
        {/* Ação Principal: Gerar Treino */}
        <div 
          className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer" 
          onClick={onGenerateWorkout}
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Dumbbell className="w-24 h-24 text-black rotate-12" />
          </div>
          <h2 className="text-black font-black text-2xl mb-1">Novo Treino IA</h2>
          <p className="text-black/70 text-sm font-bold mb-6">Monte sua rotina de hoje em segundos.</p>
          <div className="bg-black text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold w-fit shadow-lg">
            <Play size={16} fill="white" /> GERAR AGORA
          </div>
        </div>

        {/* Biblioteca de Treinos Salvos */}
        <section className="bg-dark-gray border border-white/5 rounded-3xl p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <History size={18} className="text-blue-400" /> Seus Treinos Salvos
          </h3>
          <div className="space-y-3">
            {history.length > 0 ? history.slice(0, 3).map(w => (
              <div key={w.id} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-tight">{w.planTitle}</p>
                  <p className="text-[10px] text-gray-500">{new Date(w.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <ArrowUpRight size={14} className="text-blue-400" />
                </div>
              </div>
            )) : (
              <div className="text-center py-4 border border-dashed border-white/10 rounded-2xl">
                <p className="text-xs text-gray-600 italic">Nenhum treino no histórico.</p>
              </div>
            )}
          </div>
          {history.length > 3 && (
            <button className="w-full text-center mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Ver Biblioteca Completa</button>
          )}
        </section>

        {/* Insight de IA - Retenção e Guia */}
        <div className="bg-dark-gray border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Evolução de Carga</p>
              <h3 className="text-xl font-bold">Análise do Treinador</h3>
            </div>
            <div className="bg-black/40 px-3 py-2 rounded-2xl border border-white/5 flex items-center gap-2">
              <Flame className={stats.isOnTrack ? "text-orange-500" : "text-gray-600"} size={18} />
              <span className="font-black text-lg">{stats.recentCount}<span className="text-gray-600 text-sm font-normal">/{stats.target}</span></span>
            </div>
          </div>

          <div className="relative h-4 bg-black/50 rounded-full mb-4 overflow-hidden border border-white/5">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-1000 ease-out"
              style={{ width: `${stats.progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-yellow-500/90 bg-yellow-500/5 p-4 rounded-2xl border border-yellow-500/10 leading-relaxed italic">
            <TrendingUp size={18} className="shrink-0" />
            <p>
              {stats.progress >= 80 
                ? "Sua constância está excepcional! Para evitar o platô, hoje a IA irá priorizar técnicas de bi-set e descanso reduzido." 
                : "Ainda não detectamos volume suficiente para sugerir progressão. Mantenha o foco esta semana para ajustes de carga."}
            </p>
          </div>
        </div>

        {/* Nutrição Elite */}
        <section className="bg-dark-gray rounded-3xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Utensils className="text-green-500" size={20} />
              <h3 className="font-bold text-sm">Plano Alimentar IA</h3>
            </div>
            <button onClick={generateDiet} disabled={isGeneratingDiet} className="text-[10px] font-bold text-green-500 uppercase">
              {dietPlan ? 'Atualizar' : 'Consultar IA'}
            </button>
          </div>
          {isGeneratingDiet ? (
            <div className="animate-pulse text-[10px] text-green-500 uppercase font-bold py-6 text-center">Cruzando dados de treino e biotipo...</div>
          ) : dietPlan ? (
            <div className="bg-black/40 rounded-2xl p-4 text-xs text-gray-400 leading-relaxed italic border border-white/5">{dietPlan}</div>
          ) : (
            <div className="text-center py-6 bg-black/20 rounded-2xl border border-dashed border-white/5">
              <Apple className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="text-[10px] text-gray-600 px-6">Gere sua estratégia baseada no seu objetivo de {userProfile.goal}.</p>
            </div>
          )}
        </section>

        {/* Protocolo de Recuperação */}
        <section className="bg-dark-gray rounded-3xl border border-white/5 p-6 mb-12">
           <h3 className="font-bold mb-6 flex items-center gap-2 text-sm">
             <Star className="text-yellow-500" size={16} /> Protocolo Diário Elite
           </h3>
           <div className="space-y-3">
              {[
                { id: 'water', icon: Droplets, color: 'text-blue-400', label: 'Meta de Água (3.5L)', desc: 'Hidratação celular máxima' },
                { id: 'sleep', icon: Moon, color: 'text-purple-400', label: 'Ciclo Circadiano', desc: 'Recuperação hormonal (7h+)' },
                { id: 'protein', icon: Zap, color: 'text-orange-400', label: 'Meta Proteica', desc: 'Manutenção de massa magra' }
              ].map(habit => (
                <button
                  key={habit.id}
                  onClick={() => setDailyHabits(prev => ({ ...prev, [habit.id]: !prev[habit.id as keyof typeof dailyHabits] }))}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    dailyHabits[habit.id as keyof typeof dailyHabits] ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-black/20 border-white/5'
                  }`}
                >
                  <habit.icon size={20} className={habit.color} />
                  <div className="text-left flex-1">
                    <p className="font-bold text-xs">{habit.label}</p>
                    <p className="text-[9px] text-gray-600">{habit.desc}</p>
                  </div>
                  {dailyHabits[habit.id as keyof typeof dailyHabits] && <CheckCircle2 className="text-yellow-500" size={16} />}
                </button>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};
