
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
  PRIVACY = 'PRIVACY'
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

export interface UserProfile {
  name: string;
  email?: string;
  picture?: string;
  weight: string;
  height: string;
  age: string;
  level: UserLevel;
  goal: UserGoal;
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
  completed?: boolean; // Novo campo para histórico
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
  exercises?: Exercise[]; // Novo campo para detalhamento
}
