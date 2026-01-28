
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, UserProfile, MachineAnalysis, WorkoutPlan, CompletedWorkout, UserDataStore, UserLevel, UserGoal, UsageLog } from './types';
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
import { PremiumHubView } from './views/PremiumHubView';
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

  const saveUserDataToCloud = useCallback((email: string, profile: UserProfile | null, history: CompletedWorkout[], premium: boolean) => {
    const data: UserDataStore = { profile, history, isPremium: premium };
    localStorage.setItem(`fitscan_user_${email}`, JSON.stringify(data));
  }, []);

  const loadUserDataFromCloud = (email: string) => {
    const rawData = localStorage.getItem(`fitscan_user_${email}`);
    if (rawData) {
      const data: UserDataStore = JSON.parse(rawData);
      setUserProfile(data.profile);
      setWorkoutHistory(data.history || []);
      setIsPremium(data.isPremium || false);
      return data;
    }
    return null;
  };

  useEffect(() => {
    const activeSessionEmail = localStorage.getItem('fitscan_active_session');
    if (activeSessionEmail) {
      const data = loadUserDataFromCloud(activeSessionEmail);
      if (data && data.profile) {
        setView(AppView.DASHBOARD);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userProfile?.email) {
      saveUserDataToCloud(userProfile.email, userProfile, workoutHistory, isPremium);
    }
  }, [userProfile, workoutHistory, isPremium, saveUserDataToCloud]);

  const checkUsageLimit = (type: 'scan' | 'workout'): boolean => {
    if (!userProfile) return false;
    const history = userProfile.usageHistory || [];
    const now = new Date();
    
    if (isPremium) {
      const thisMonth = history.filter(log => {
        const logDate = new Date(log.date);
        return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
      });
      if (thisMonth.length >= 150) {
        setLimitModal({ isOpen: true, type });
        return false;
      }
    } else {
      const today = history.filter(log => {
        const logDate = new Date(log.date);
        return logDate.toDateString() === now.toDateString() && log.type === type;
      });
      if (today.length >= 3) {
        setLimitModal({ isOpen: true, type });
        return false;
      }
    }
    return true;
  };

  const logUsage = (type: 'scan' | 'workout') => {
    if (!userProfile) return;
    const newLog: UsageLog = { date: new Date().toISOString(), type };
    setUserProfile(prev => prev ? ({
      ...prev,
      usageHistory: [...(prev.usageHistory || []), newLog]
    }) : null);
  };

  const handleGoogleLogin = (response: any) => {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const payload = JSON.parse(jsonPayload);

      const email = payload.email;
      localStorage.setItem('fitscan_active_session', email);
      
      const existingData = loadUserDataFromCloud(email);
      
      if (existingData && existingData.profile) {
        setView(AppView.DASHBOARD);
      } else {
        setUserProfile({
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          weight: '',
          height: '',
          age: '',
          level: UserLevel.INICIANTE,
          goal: UserGoal.SAUDAVEL,
          usageHistory: []
        });
        setView(AppView.PROFILE);
      }
    } catch (e) {
      console.error("Login Error", e);
    }
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('fitscan_active_session');
    setUserProfile(null);
    setWorkoutHistory([]);
    setIsPremium(false);
    setView(AppView.WELCOME);
  };

  const handleGenerateWorkout = async () => {
    if (!userProfile) return;
    if (!checkUsageLimit('workout')) return;

    setIsGeneratingWorkout(true);
    try {
      const plan = await generateFullWorkout(userProfile);
      setWorkoutPlan(plan);
      logUsage('workout');
      setView(AppView.WORKOUT);
    } catch (e) {
      alert("Erro na conexão com IA. Verifique sua chave API.");
    } finally {
      setIsGeneratingWorkout(false);
    }
  };

  if (isLoading || isGeneratingWorkout) {
    return (
      <div className="app-container flex flex-col items-center justify-center p-8 text-center bg-black min-h-screen">
        <div className="w-16 h-16 border-4 border-neon/20 border-t-neon rounded-full animate-spin"></div>
        <h2 className="text-white text-lg font-bold mt-6">FitScan Brasil</h2>
        <p className="text-gray-500 text-xs italic">Aguarde um momento...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <LimitModal 
        isOpen={limitModal.isOpen} 
        type={limitModal.type}
        isPremium={isPremium}
        onClose={() => setLimitModal({ isOpen: false, type: null })}
        onUpgrade={() => {
          setLimitModal({ isOpen: false, type: null });
          setView(AppView.PREMIUM);
        }}
      />

      {view === AppView.WELCOME && (
        <WelcomeView 
          onStart={() => {}} 
          onOpenPrivacy={() => setView(AppView.PRIVACY)} 
          onGoogleLogin={handleGoogleLogin}
          onGuestLogin={() => {}}
        />
      )}

      {view === AppView.PROFILE && userProfile && (
        <ProfileSetupView onComplete={handleProfileComplete} initialData={userProfile} />
      )}

      {view === AppView.DASHBOARD && userProfile && (
        <DashboardView 
          userProfile={userProfile} 
          isPremium={isPremium}
          onGenerateWorkout={handleGenerateWorkout}
          onPremiumClick={() => setView(AppView.PREMIUM)}
          onOpenPremiumHub={() => setView(AppView.PREMIUM_HUB)}
        />
      )}

      {view === AppView.SCANNER && userProfile && (
        <ScannerView 
          userProfile={userProfile} 
          onAnalysisComplete={(res) => { 
            if (checkUsageLimit('scan')) {
              setMachineAnalysis(res); 
              logUsage('scan');
              setView(AppView.RESULT); 
            }
          }}
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
        <WorkoutView plan={workoutPlan} onFinish={(indices) => {
          const newWorkout: CompletedWorkout = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            planTitle: workoutPlan?.title || "Treino IA",
            durationMinutes: workoutPlan?.estimatedDurationMin || 45,
            exercisesCompleted: indices.length,
            totalExercises: workoutPlan?.exercises.length || 0,
            exercises: workoutPlan?.exercises.map((ex, i) => ({...ex, completed: indices.includes(i)}))
          };
          setWorkoutHistory(prev => [newWorkout, ...prev]);
          setView(AppView.PROGRESS);
        }} />
      )}

      {view === AppView.PROGRESS && <ProgressView history={workoutHistory} />}
      
      {view === AppView.SETTINGS && userProfile && (
        <SettingsView 
          userProfile={userProfile} 
          isPremium={isPremium}
          onEditProfile={() => setView(AppView.PROFILE)}
          onPremiumClick={() => setView(AppView.PREMIUM)}
          onLogout={handleLogout}
          onOpenPrivacy={() => setView(AppView.PRIVACY)}
        />
      )}

      {view === AppView.PREMIUM && <PremiumView onClose={() => setView(AppView.DASHBOARD)} />}
      {view === AppView.PRIVACY && <PrivacyView onBack={() => setView(userProfile ? AppView.SETTINGS : AppView.WELCOME)} />}

      {view === AppView.PREMIUM_HUB && userProfile && (
        <PremiumHubView 
          userProfile={userProfile}
          history={workoutHistory}
          onUpdateProfile={(updated) => setUserProfile(prev => prev ? ({ ...prev, ...updated }) : null)}
          onGenerateWorkout={handleGenerateWorkout}
        />
      )}

      {(view === AppView.DASHBOARD || view === AppView.PREMIUM_HUB || view === AppView.PROGRESS || view === AppView.SETTINGS) && (
        <BottomNav 
          currentView={view} 
          onNavigate={setView} 
          onScan={() => {
            if (checkUsageLimit('scan')) setView(AppView.SCANNER);
          }} 
        />
      )}
    </div>
  );
};

export default App;
