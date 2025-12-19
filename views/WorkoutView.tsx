
import React, { useState, Suspense } from 'react';
import { WorkoutPlan } from '../types';
import { Button } from '../components/Button';
import { Clock, Trophy, CheckSquare, Square, Play, PlayCircle } from 'lucide-react';

const VideoModal = React.lazy(() => import('../components/VideoModal').then(module => ({ default: module.VideoModal })));

interface Props {
  plan: WorkoutPlan | null;
  onGenerate?: () => void;
  onFinish?: (completedIndices: number[]) => void;
}

export const WorkoutView: React.FC<Props> = ({ plan, onGenerate, onFinish }) => {
  const [completed, setCompleted] = useState<number[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{term: string, title: string, videoId?: string} | null>(null);

  const toggleExercise = (index: number) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter(i => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  const handleOpenVideo = (e: React.MouseEvent, searchTerm: string, title: string, videoId?: string) => {
    e.stopPropagation();
    setSelectedVideo({ term: searchTerm, title, videoId });
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish(completed);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 pb-32 text-center">
        <div className="w-20 h-20 bg-dark-gray rounded-full flex items-center justify-center mb-6 border border-white/10">
            <DumbbellIcon className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Nenhum treino ativo</h2>
        <p className="text-gray-400 mb-8 max-w-xs">
          Você ainda não gerou um treino para hoje. Use a IA para criar um plano personalizado.
        </p>
        <Button onClick={onGenerate} fullWidth>
            <Play className="w-4 h-4" /> Gerar Treino Agora
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-32">
      {selectedVideo && (
        <Suspense fallback={<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"><div className="w-12 h-12 border-4 border-neon border-t-transparent rounded-full animate-spin"></div></div>}>
          <VideoModal 
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            searchTerm={selectedVideo.term}
            title={selectedVideo.title}
            videoId={selectedVideo.videoId}
          />
        </Suspense>
      )}

      <div className="sticky top-0 bg-black/90 backdrop-blur-md z-20 p-4 border-b border-white/10">
        <h1 className="font-bold text-white text-lg truncate">{plan.title}</h1>
      </div>

      <div className="p-6 animate-fade-in">
        <div className="flex gap-4 mb-6">
            <div className="bg-dark-gray rounded-xl p-3 flex-1 flex items-center gap-3 border border-white/5">
                <Clock className="text-neon w-5 h-5" />
                <div>
                    <div className="text-xs text-gray-400">Duração</div>
                    <div className="font-bold text-white">{plan.estimatedDurationMin} min</div>
                </div>
            </div>
            <div className="bg-dark-gray rounded-xl p-3 flex-1 flex items-center gap-3 border border-white/5">
                <Trophy className="text-yellow-500 w-5 h-5" />
                <div>
                    <div className="text-xs text-gray-400">Exercícios</div>
                    <div className="font-bold text-white">{plan.exercises.length}</div>
                </div>
            </div>
        </div>

        <div className="bg-neon/5 border border-neon/20 rounded-xl p-4 mb-8">
            <h3 className="text-neon font-bold text-sm mb-1">Dica do Personal IA</h3>
            <p className="text-gray-300 text-sm italic">"{plan.coachTip}"</p>
        </div>

        <div className="space-y-4">
            {plan.exercises.map((ex, i) => (
                <div 
                    key={i} 
                    onClick={() => toggleExercise(i)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                        completed.includes(i) 
                        ? 'bg-green-900/20 border-green-500/30 opacity-60' 
                        : 'bg-dark-gray border-white/5 active:scale-[0.98]'
                    }`}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-bold text-lg pr-8 ${completed.includes(i) ? 'text-green-400 line-through' : 'text-white'}`}>
                            {ex.name}
                        </h4>
                        {completed.includes(i) ? <CheckSquare className="text-green-500 shrink-0" /> : <Square className="text-gray-600 shrink-0" />}
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-3">
                        <span><strong className="text-white">{ex.sets}</strong> Séries</span>
                        <span><strong className="text-white">{ex.reps}</strong> Reps</span>
                        <span><strong className="text-white">{ex.restSeconds}s</strong> Descanso</span>
                    </div>
                    
                    <div className="flex justify-between items-end gap-2">
                        <div className="text-xs text-gray-500 bg-black/30 p-2 rounded flex-1">
                            💡 {ex.notes}
                        </div>
                        
                        <button 
                            onClick={(e) => handleOpenVideo(e, ex.videoSearchTerm || `${ex.name} execução`, ex.name, ex.youtubeVideoId)}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-neon transition-colors flex items-center gap-1 z-10"
                            title="Ver vídeo"
                        >
                            <PlayCircle className="w-5 h-5" />
                            <span className="text-xs font-bold hidden sm:inline">Vídeo Aula</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-8">
            <Button fullWidth onClick={handleFinish} variant="outline">
                <Trophy className="w-4 h-4" /> Finalizar Treino
            </Button>
        </div>
      </div>
    </div>
  );
};

const DumbbellIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>
);
