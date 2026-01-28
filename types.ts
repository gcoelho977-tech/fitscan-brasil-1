
export enum AppView {
  WELCOME = 'WELCOME',
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  RESULT = 'RESULT',
  WORKOUT = 'WORKOUT',
  PROGRESS = 'PROGRESS',
  PREMIUM = 'PREMIUM',
  SETTINGS = 'SETTINGS',
  PRIVACY = 'PRIVACY',
  PREMIUM_HUB = 'PREMIUM_HUB'
}

export enum UserLevel {
  INICIANTE = 'Iniciante',
  INTERMEDIARIO = 'Intermediário',
  AVANCADO = 'Avançado'
}

export enum UserGoal {
  EMAGRECER = 'Emagrecer',
  HIPERTROFIA = 'Hipertrofia',
  DEFINICAO = 'Definição',
  RESISTENCIA = 'Resistência',
  SAUDAVEL = 'Saudável'
}

export enum Gender {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino',
  OUTRO = 'Outro'
}

export enum WorkoutLocation {
  ACADEMIA = 'Academia',
  CASA = 'Casa'
}

export interface UsageLog {
  date: string;
  type: 'scan' | 'workout';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  weight: string;
  height: string;
  age: string;
  level: UserLevel;
  goal: UserGoal;
  gender?: Gender;
  locationPreference?: WorkoutLocation;
  usageHistory?: UsageLog[];
}

export interface MachineAnalysis {
  machineName: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: string;
  instructions: string[];
  commonErrors: string[];
  recommendedSets: number;
  recommendedReps: string;
  recommendedWeight: string; 
  tempo: string;
  youtubeQuery: string;
  youtubeVideoId?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes: string;
  videoSearchTerm: string;
  youtubeVideoId?: string;
  completed?: boolean;
}

export interface WorkoutPlan {
  title: string;
  estimatedDurationMin: number;
  exercises: Exercise[];
  coachTip: string;
}

export interface CompletedWorkout {
  id: string;
  date: string;
  planTitle: string;
  durationMinutes: number;
  exercisesCompleted: number;
  totalExercises: number;
  exercises?: Exercise[];
}

export interface UserDataStore {
  profile: UserProfile | null;
  history: CompletedWorkout[];
  isPremium: boolean;
}
