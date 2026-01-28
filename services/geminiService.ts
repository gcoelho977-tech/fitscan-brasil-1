
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, MachineAnalysis, WorkoutPlan } from "../types";

// Using correct model names as per guidelines
const FLASH_MODEL = "gemini-3-flash-preview";
const PRO_MODEL = "gemini-3-pro-preview";

export const analyzeMachineImage = async (
  base64Image: string,
  userProfile: UserProfile
): Promise<MachineAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Identifique a máquina de academia nesta imagem.
    Perfil do Usuário: ${userProfile.level}, Objetivo: ${userProfile.goal}.
    Responda em JSON com instruções seguras, erros comuns e termo de busca para YouTube.
  `;

  // FIX: Using Type enum and following property definitions without the Schema interface for clarity
  const schema = {
    type: Type.OBJECT,
    properties: {
      machineName: { type: Type.STRING },
      primaryMuscles: { type: Type.ARRAY, items: { type: Type.STRING } },
      secondaryMuscles: { type: Type.ARRAY, items: { type: Type.STRING } },
      difficulty: { type: Type.STRING },
      instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
      commonErrors: { type: Type.ARRAY, items: { type: Type.STRING } },
      recommendedSets: { type: Type.INTEGER },
      recommendedReps: { type: Type.STRING },
      recommendedWeight: { type: Type.STRING },
      tempo: { type: Type.STRING },
      youtubeQuery: { type: Type.STRING },
      youtubeVideoId: { type: Type.STRING }
    },
    required: ["machineName", "instructions", "primaryMuscles"]
  };

  // FIX: Correcting the contents structure for multimodal requests to match @google/genai examples
  const response = await ai.models.generateContent({
    model: FLASH_MODEL,
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || '{}') as MachineAnalysis;
};

export const generateFullWorkout = async (userProfile: UserProfile): Promise<WorkoutPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Crie um treino completo de 6 a 10 exercícios para: ${userProfile.name}, Nível: ${userProfile.level}, Objetivo: ${userProfile.goal}.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      estimatedDurationMin: { type: Type.INTEGER },
      coachTip: { type: Type.STRING },
      exercises: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            sets: { type: Type.INTEGER },
            reps: { type: Type.STRING },
            restSeconds: { type: Type.INTEGER },
            notes: { type: Type.STRING },
            videoSearchTerm: { type: Type.STRING }
          }
        }
      }
    },
    required: ["title", "exercises"]
  };

  // FIX: Using gemini-3-pro-preview for advanced reasoning task like generating a full workout plan
  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || '{}') as WorkoutPlan;
};
