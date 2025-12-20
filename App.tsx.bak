
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, MachineAnalysis, WorkoutPlan, CompletedWorkout } from './types';
import { WelcomeView } from './views/WelcomeView';
import { ProfileSetupView } from './views/ProfileSetupView';
import { DashboardView } from './views/DashboardView';
import { ScannerView } from './views/ScannerView';
import { ResultView } from './views/ResultView';
import { WorkoutView } from './views/WorkoutView';
import { ProgressView } from './views/ProgressView';
import { PremiumView } from './views/PremiumView';
import { SettingsView } from './views/SettingsView';
import { PrivacyView } from './views/PrivacyView';
import { BottomNav } from './components/BottomNav';
import { LimitModal } from './components/LimitModal';
import { generateFullWorkout } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.WELCOME);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [machineAnalysis, setMachineAnalysis] = useState<MachineAnalysis | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<CompletedWorkout[]>([]);
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [limitModal, setLimitModal] = useState<{isOpen: boolean, type: 'scan' | 'workout' | null}>({
    isOpen: false,
    type: null
  });

  useEffect(() => {
    const initApp = () => {
      const savedProfile = localStorage.getItem('fitscan_profile');
      const premiumStatus = localStorage.getItem('fitscan_premium') === 'true';
      const history = localStorage.getItem('fitscan_history');

      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setView(AppView.DASHBOARD);
      }
      if (history) setWorkoutHistory(JSON.parse(history));
      setIsPremium(premiumStatus);
      setIsLoading(false);
    };
    initApp();
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('fitscan_profile', JSON.stringify(profile));
    setView(AppView.DASHBOARD);
  };

  const handleGenerateWorkout = async () => {
    if (!userProfile) return;
    setIsGeneratingWorkout(true);
    try {
      const plan = await generateFullWorkout(userProfile);
      setWorkoutPlan(plan);
      setView(AppView.WORKOUT);
    } catch (e) {
      alert("Erro ao gerar treino. Tente novamente.");
    } finally {
      setIsGeneratingWorkout(false);
    }
  };

  const showBottomNav = [
    AppView.DASHBOARD,
    AppView.WORKOUT,
    AppView.PROGRESS,
    AppView.SETTINGS
  ].includes(view);

  if (isLoading || isGeneratingWorkout) {
    return (
      <div className="app-container flex flex-col items-center justify-center p-8 text-center bg-black min-h-screen">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-neon/20 border-t-neon rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-neon rounded-full animate-ping"></div>
          </div>
        </div>
        <h2 className="text-white text-xl font-bold mt-8 mb-2">
          {isLoading ? "Iniciando FitScan Brasil" : "IA montando seu treino..."}
        </h2>
        <p className="text-gray-500 text-sm max-w-[200px]">
          Preparando sua experiência de alta performance.
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <LimitModal 
        isOpen={limitModal.isOpen} 
        type={limitModal.type}
        onClose={() => setLimitModal({ isOpen: false, type: null })}
        onUpgrade={() => {
          setLimitModal({ isOpen: false, type: null });
          setView(AppView.PREMIUM);
        }}
      />

      {view === AppView.WELCOME && (
        <WelcomeView onStart={() => setView(AppView.PROFILE)} onOpenPrivacy={() => setView(AppView.PRIVACY)} />
      )}

      {view === AppView.PROFILE && (
        <ProfileSetupView onComplete={handleProfileComplete} />
      )}

      {view === AppView.DASHBOARD && userProfile && (
        <DashboardView 
          userProfile={userProfile} 
          isPremium={isPremium}
          onGenerateWorkout={handleGenerateWorkout}
          onPremiumClick={() => setView(AppView.PREMIUM)}
        />
      )}

      {view === AppView.SCANNER && userProfile && (
        <ScannerView 
          userProfile={userProfile} 
          onAnalysisComplete={(res) => { setMachineAnalysis(res); setView(AppView.RESULT); }}
          onCancel={() => setView(AppView.DASHBOARD)}
        />
      )}

      {view === AppView.RESULT && machineAnalysis && (
        <ResultView 
          data={machineAnalysis} 
          onAddWorkout={() => setView(AppView.DASHBOARD)} 
          onScanAnother={() => setView(AppView.SCANNER)} 
        />
      )}

      {view === AppView.WORKOUT && (
        <WorkoutView plan={workoutPlan} onFinish={() => setView(AppView.PROGRESS)} />
      )}

      {view === AppView.PROGRESS && <ProgressView history={workoutHistory} />}
      
      {view === AppView.SETTINGS && userProfile && (
        <SettingsView 
          userProfile={userProfile} 
          isPremium={isPremium}
          onEditProfile={() => setView(AppView.PROFILE)}
          onPremiumClick={() => setView(AppView.PREMIUM)}
          onLogout={() => { localStorage.clear(); window.location.reload(); }}
          onOpenPrivacy={() => setView(AppView.PRIVACY)}
        />
      )}

      {view === AppView.PREMIUM && <PremiumView onClose={() => setView(AppView.DASHBOARD)} />}
      {view === AppView.PRIVACY && <PrivacyView onBack={() => setView(userProfile ? AppView.SETTINGS : AppView.WELCOME)} />}

      {showBottomNav && (
        <BottomNav 
          currentView={view} 
          onNavigate={setView} 
          onScan={() => setView(AppView.SCANNER)} 
        />
      )}
    </div>
  );
};

export default App;
