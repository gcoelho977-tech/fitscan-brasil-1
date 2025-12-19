import React, { useMemo } from 'react';
import { X, ExternalLink, Youtube } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  title: string;
  videoId?: string; // Optional direct video ID
}

// Mapeamento de segurança com IDs de vídeo confiáveis (Geralmente animações 3D ou canais educativos abertos)
const VIDEO_MAPPING: Record<string, string> = {
  // Pernas
  'leg press': 'yZ-51XUe6O4', // 3D Animation
  'agachamento': 'YaXPRqUwItQ', // Squat guide
  'extensora': 'YyvSfVjQeL0', // Leg extension
  'flexora': '1Tq3QdYUuHs', // Leg curl
  'abdutora': 'G5W6j7i_7jY', // Abductor
  'adutora': 'CjG32qS2Yvw', // Adductor
  'panturrilha': 'gwLzBJYoWlI', // Calf raise
  'gluteo': 'SErO032XzGQ', // Glute kickback
  'stiff': 'CnTF9j7Wq_8', // Stiff

  // Peito/Ombro/Triceps
  'supino': 'rT7DgCr-3pg', // Bench press
  'crucifixo': 'taI4XduLpTk', // Fly
  'peck deck': 'O-On0obCPh4', // Pec deck
  'flexão': '_l3ySVKYVJ8', // Push up
  'desenvolvimento': 'M2jGha9dGgA', // Shoulder press
  'elevação lateral': '3VcKaXpzqRo', // Lateral raise
  'elevação frontal': '-t7fuZ0KhDA', // Front raise
  'triceps corda': '6K2Co_CjOt4', // Triceps rope
  'triceps testa': 'd_KZxkY_0cM', // Skullcrusher

  // Costas/Biceps
  'puxada': 'CAwf7n6Luuc', // Lat pulldown
  'remada': 'GZbfZ033f74', // Row
  'rosca direta': 'i1YgFZB6al4', // Bicep curl
  
  // Cardio/Abs
  'esteira': '8iPtuV8aNgg',
  'bicicleta': 'vH061C5hC7c',
  'elíptico': '4Ra9-M-y2kI',
  'abdominal': '017V5qA_lTk', // Crunch
  'prancha': 'pSHjTRCQxIw'
};

export const VideoModal: React.FC<Props> = ({ isOpen, onClose, searchTerm, title, videoId }) => {
  if (!isOpen) return null;

  // Lógica para determinar ID do vídeo
  const activeVideoId = useMemo(() => {
    if (videoId && videoId.length === 11) return videoId;
    const lowerTerm = searchTerm.toLowerCase();
    for (const [key, id] of Object.entries(VIDEO_MAPPING)) {
      if (lowerTerm.includes(key)) return id;
    }
    return null; 
  }, [videoId, searchTerm]);

  // Adiciona origin para evitar erro 153 e wmode para performance
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedUrl = activeVideoId 
    ? `https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&origin=${origin}`
    : '';
    
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-gray w-full max-w-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
          <h3 className="font-bold text-white truncate pr-4 flex-1">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
          {embedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
              onError={(e) => console.error("Erro no player", e)}
            ></iframe>
          ) : (
            <div className="text-center p-8 flex flex-col items-center justify-center h-full">
              <Youtube className="w-16 h-16 text-red-600 mb-4" />
              <p className="text-gray-400 mb-4 text-center text-sm">
                Não encontramos um vídeo específico incorporável.
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-6 bg-dark-gray">
          <div className="bg-neon/5 border border-neon/10 rounded-xl p-3 mb-4">
             <p className="text-xs text-gray-300">
               <span className="text-neon font-bold">Dica FitScan:</span> Se o vídeo acima der erro (bloqueio do proprietário), use o botão abaixo.
             </p>
          </div>

          {/* Link Externo Robusto */}
          <a 
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-900/20 no-underline"
          >
            <ExternalLink className="w-5 h-5" /> Assistir no App do YouTube
          </a>
        </div>
      </div>
    </div>
  );
};