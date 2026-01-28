import React, { useState, Suspense } from 'react';
import { Button } from '../components/Button';
import { MachineAnalysis } from '../types';
import { CheckCircle, AlertTriangle, Info, Dumbbell, Clock, RotateCw, PlayCircle } from 'lucide-react';

const VideoModal = React.lazy(() => import('../components/VideoModal').then(module => ({ default: module.VideoModal })));

interface Props {
  data: MachineAnalysis;
  onAddWorkout: () => void;
  onScanAnother: () => void;
}

export const ResultView: React.FC<Props> = ({ data, onAddWorkout, onScanAnother }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black pb-24">
      {isVideoOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"><div className="w-12 h-12 border-4 border-neon border-t-transparent rounded-full animate-spin"></div></div>}>
          <VideoModal 
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            searchTerm={data.youtubeQuery || `${data.machineName} execução correta`}
            title={`Como usar: ${data.machineName}`}
            videoId={data.youtubeVideoId}
          />
        </Suspense>
      )}

      <div className="bg-gradient-to-b from-gray-900 to-black p-6 pt-12 border-b border-white/10">
        <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-white leading-tight">{data.machineName}</h1>
            <span className="bg-neon/20 text-neon text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border border-neon/30">
                {data.difficulty}
            </span>
        </div>
        
        <div className="flex gap-2 flex-wrap mb-4">
            {data.primaryMuscles.map((m, i) => (
                <span key={i} className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">
                    {m}
                </span>
            ))}
        </div>

        <button 
          onClick={() => setIsVideoOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-colors w-fit shadow-lg shadow-red-900/20"
        >
          <PlayCircle className="w-4 h-4 fill-white text-red-600" /> Ver Execução Correta
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats Card */}
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-dark-gray p-3 rounded-xl border border-white/5 text-center">
                <Dumbbell className="w-5 h-5 text-neon mx-auto mb-2" />
                <div className="text-xs text-gray-400">Carga</div>
                <div className="font-bold text-white">{data.recommendedWeight}</div>
            </div>
            <div className="bg-dark-gray p-3 rounded-xl border border-white/5 text-center">
                <RotateCw className="w-5 h-5 text-neon mx-auto mb-2" />
                <div className="text-xs text-gray-400">Reps</div>
                <div className="font-bold text-white">{data.recommendedReps}</div>
            </div>
            <div className="bg-dark-gray p-3 rounded-xl border border-white/5 text-center">
                <Clock className="w-5 h-5 text-neon mx-auto mb-2" />
                <div className="text-xs text-gray-400">Tempo</div>
                <div className="font-bold text-white">{data.tempo}</div>
            </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-neon" /> Como usar
            </h3>
            <ul className="space-y-3 relative border-l border-gray-800 ml-2 pl-6">
                {data.instructions.map((inst, i) => (
                    <li key={i} className="text-gray-300 text-sm relative">
                        <span className="absolute -left-[31px] w-2.5 h-2.5 rounded-full bg-gray-700 top-1.5 border border-black"></span>
                        {inst}
                    </li>
                ))}
            </ul>
        </div>

        {/* Errors */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <h3 className="text-red-400 font-bold flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5" /> Evite esses erros
            </h3>
            <ul className="space-y-2">
                {data.commonErrors.map((err, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span> {err}
                    </li>
                ))}
            </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-lg border-t border-white/10 flex flex-col gap-3">
        <Button onClick={onAddWorkout} fullWidth>
          Adicionar ao meu treino
        </Button>
        <Button onClick={onScanAnother} variant="outline" fullWidth>
          Escanear outra máquina
        </Button>
      </div>
    </div>
  );
};