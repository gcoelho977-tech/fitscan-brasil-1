import React, { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Camera, Upload, X, Zap } from 'lucide-react';
import { analyzeMachineImage } from '../services/geminiService';
import { UserProfile, MachineAnalysis } from '../types';

interface Props {
  userProfile: UserProfile;
  onAnalysisComplete: (analysis: MachineAnalysis) => void;
  onCancel: () => void;
}

export const ScannerView: React.FC<Props> = ({ userProfile, onAnalysisComplete, onCancel }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    
    setIsAnalyzing(true);
    try {
      // Remove data URL prefix for API
      const base64 = preview.split(',')[1];
      const result = await analyzeMachineImage(base64, userProfile);
      onAnalysisComplete(result);
    } catch (error) {
      // Show translated error message from service
      const errorMessage = error instanceof Error ? error.message : "Não foi possível analisar a imagem. Tente novamente com uma foto mais clara.";
      alert(errorMessage);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onCancel} className="bg-black/40 backdrop-blur rounded-full p-2 text-white">
          <X />
        </button>
        <div className="text-white font-bold bg-black/40 backdrop-blur px-4 py-2 rounded-full text-sm">
          FitScan AI
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center relative">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <div className="w-full h-64 border-2 border-dashed border-gray-700 rounded-3xl flex items-center justify-center mb-6 bg-dark-gray/20">
               <Camera className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Escanear Máquina</h3>
            <p className="text-gray-400">Aponte a câmera para o equipamento que deseja usar.</p>
          </div>
        )}
        
        {/* Scanning overlay effect */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neon font-bold animate-pulse">Analisando equipamento...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-dark-gray/90 backdrop-blur-lg border-t border-white/10 rounded-t-3xl z-20">
        {!preview ? (
           <Button 
             onClick={() => fileInputRef.current?.click()} 
             fullWidth 
             className="bg-white text-black hover:bg-gray-200"
           >
             <Camera className="w-5 h-5" /> Tirar foto da máquina
           </Button>
        ) : (
          <div className="space-y-3">
            <Button 
              onClick={handleAnalyze} 
              fullWidth 
              disabled={isAnalyzing}
              className="shadow-[0_0_20px_rgba(0,255,136,0.4)]"
            >
              <Zap className="w-5 h-5 fill-black" /> {isAnalyzing ? "Processando..." : "Analisar com IA"}
            </Button>
            <Button 
              onClick={() => setPreview(null)} 
              variant="outline" 
              fullWidth
              disabled={isAnalyzing}
            >
              Tirar outra foto
            </Button>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
        onChange={handleFileChange}
      />
    </div>
  );
};