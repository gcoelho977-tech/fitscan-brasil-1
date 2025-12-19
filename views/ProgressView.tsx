
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CompletedWorkout } from '../types';
import { Calendar, Clock, Trophy, CheckCircle2, X, CheckSquare } from 'lucide-react';

const weightData = [
  { name: 'Sem 1', weight: 78 },
  { name: 'Sem 2', weight: 77.5 },
  { name: 'Sem 3', weight: 76.8 },
  { name: 'Sem 4', weight: 76.2 },
];

const workoutData = [
  { name: 'Seg', cals: 320 },
  { name: 'Ter', cals: 450 },
  { name: 'Qua', cals: 0 },
  { name: 'Qui', cals: 380 },
  { name: 'Sex', cals: 500 },
];

interface Props {
    history?: CompletedWorkout[];
}

export const ProgressView: React.FC<Props> = ({ history = [] }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<CompletedWorkout | null>(null);
  
  // Format date for display
  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  };

  const formatFullDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <div className="min-h-screen bg-black p-6 pb-32 animate-fade-in relative">
      
      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-dark-gray w-full max-w-md rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/30 rounded-t-2xl">
                    <div>
                        <h3 className="font-bold text-white text-lg">{selectedWorkout.planTitle}</h3>
                        <p className="text-gray-400 text-xs">{formatFullDate(selectedWorkout.date)}</p>
                    </div>
                    <button onClick={() => setSelectedWorkout(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-4 overflow-y-auto custom-scrollbar">
                    <div className="flex gap-3 mb-4">
                        <div className="bg-black/30 p-2 rounded-lg flex-1 text-center border border-white/5">
                            <div className="text-xs text-gray-400">Duração</div>
                            <div className="font-bold text-white">{selectedWorkout.durationMinutes} min</div>
                        </div>
                        <div className="bg-black/30 p-2 rounded-lg flex-1 text-center border border-white/5">
                            <div className="text-xs text-gray-400">Exercícios</div>
                            <div className="font-bold text-white">{selectedWorkout.exercisesCompleted}/{selectedWorkout.totalExercises}</div>
                        </div>
                    </div>

                    <h4 className="text-neon font-bold text-sm mb-3 uppercase tracking-wider">Exercícios Realizados</h4>
                    
                    <div className="space-y-3">
                        {selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? (
                            selectedWorkout.exercises.map((ex, i) => (
                                <div key={i} className={`p-3 rounded-xl border ${ex.completed ? 'bg-green-900/10 border-green-500/20' : 'bg-white/5 border-white/5'} flex items-start gap-3`}>
                                    <div className={`mt-1 ${ex.completed ? 'text-green-500' : 'text-gray-600'}`}>
                                        <CheckSquare className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h5 className={`font-bold text-sm ${ex.completed ? 'text-white' : 'text-gray-500'}`}>{ex.name}</h5>
                                        <div className="text-xs text-gray-400 mt-1 flex gap-2">
                                            <span>{ex.sets} Séries</span> • <span>{ex.reps} Reps</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-4">Detalhes não disponíveis para este treino antigo.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8 pt-2">
        <h1 className="text-2xl font-bold text-white">Sua Evolução</h1>
      </div>

      <div className="bg-dark-gray rounded-2xl p-4 mb-6 border border-white/5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-neon rounded-full"></span>
            Peso Corporal (kg)
        </h3>
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="weight" stroke="#00FF88" strokeWidth={3} dot={{ r: 4, fill: '#00FF88' }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-dark-gray rounded-2xl p-4 mb-6 border border-white/5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Calorias da Semana
        </h3>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} />
                    <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="cals" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* History Section */}
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-400" />
        Histórico de Treinos
      </h3>

      <div className="space-y-3">
        {history.length > 0 ? (
            history.map((workout) => (
                <div 
                    key={workout.id} 
                    onClick={() => setSelectedWorkout(workout)}
                    className="bg-dark-gray p-4 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-neon/10 p-3 rounded-lg text-neon font-bold text-xs flex flex-col items-center w-14">
                            <span>{formatDate(workout.date).split(' ')[0]}</span>
                            <span className="uppercase">{formatDate(workout.date).split(' ')[1]}</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{workout.planTitle || "Treino Personalizado"}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {workout.durationMinutes} min
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> {workout.exercisesCompleted}/{workout.totalExercises}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-neon">
                        <Trophy className="w-5 h-5" />
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-8 text-gray-500 bg-dark-gray/30 rounded-xl border border-dashed border-gray-700">
                <p>Nenhum treino registrado ainda.</p>
                <p className="text-xs mt-1">Complete um treino para ver seu histórico aqui.</p>
            </div>
        )}
      </div>

      {history.length > 0 && (
          <div className="bg-neon/10 border border-neon/20 p-6 rounded-2xl text-center mt-6">
            <h4 className="text-neon font-bold mb-2">Continue assim! 🔥</h4>
            <p className="text-gray-400 text-sm">Você já completou {history.length} treinos com o FitScan.</p>
          </div>
      )}
    </div>
  );
};
