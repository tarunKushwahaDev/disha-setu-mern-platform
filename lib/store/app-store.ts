import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@/lib/i18n/translations';

export type UserRole = 'learner' | 'mentor' | 'admin';
export type ConnectivityStatus = 'online' | 'offline' | 'mesh';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  state: string;
  district: string;
  language: Language;
  completedQuiz: boolean;
  careerPath?: string[];
  skills?: string[];
}

export interface QuizResult {
  category: string;
  score: number;
  strengths: string[];
  recommendedStreams: string[];
}

export interface MeshDevice {
  id: string;
  name: string;
  signalStrength: number;
  lastSeen: Date;
  dataAvailable: boolean;
}

interface AppState {
  // User state
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Connectivity
  connectivity: ConnectivityStatus;
  setConnectivity: (status: ConnectivityStatus) => void;
  lastSyncTime: Date | null;
  setLastSyncTime: (time: Date) => void;
  
  // Mesh network
  meshDevices: MeshDevice[];
  setMeshDevices: (devices: MeshDevice[]) => void;
  addMeshDevice: (device: MeshDevice) => void;
  removeMeshDevice: (id: string) => void;
  isScanningDevices: boolean;
  setIsScanningDevices: (scanning: boolean) => void;
  
  // Quiz state
  quizProgress: number;
  setQuizProgress: (progress: number) => void;
  quizAnswers: Record<number, string>;
  setQuizAnswer: (questionId: number, answer: string) => void;
  clearQuizAnswers: () => void;
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult | null) => void;
  
  // Career mapping step
  careerStep: number;
  setCareerStep: (step: number) => void;
  
  // Offline cache status
  offlineCacheReady: boolean;
  setOfflineCacheReady: (ready: boolean) => void;
  cachedDataVersion: string;
  setCachedDataVersion: (version: string) => void;
  
  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Reset all state
  reset: () => void;
}

const initialState = {
  user: null,
  language: 'en' as Language,
  connectivity: 'online' as ConnectivityStatus,
  lastSyncTime: null,
  meshDevices: [],
  isScanningDevices: false,
  quizProgress: 0,
  quizAnswers: {},
  quizResult: null,
  careerStep: 1,
  offlineCacheReady: false,
  cachedDataVersion: '1.0.0',
  sidebarOpen: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setUser: (user) => set({ user }),
      setLanguage: (language) => set({ language }),
      setConnectivity: (connectivity) => set({ connectivity }),
      setLastSyncTime: (lastSyncTime) => set({ lastSyncTime }),
      
      setMeshDevices: (meshDevices) => set({ meshDevices }),
      addMeshDevice: (device) =>
        set((state) => ({
          meshDevices: [...state.meshDevices.filter((d) => d.id !== device.id), device],
        })),
      removeMeshDevice: (id) =>
        set((state) => ({
          meshDevices: state.meshDevices.filter((d) => d.id !== id),
        })),
      setIsScanningDevices: (isScanningDevices) => set({ isScanningDevices }),
      
      setQuizProgress: (quizProgress) => set({ quizProgress }),
      setQuizAnswer: (questionId, answer) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [questionId]: answer },
        })),
      clearQuizAnswers: () => set({ quizAnswers: {}, quizProgress: 0 }),
      setQuizResult: (quizResult) => set({ quizResult }),
      
      setCareerStep: (careerStep) => set({ careerStep }),
      
      setOfflineCacheReady: (offlineCacheReady) => set({ offlineCacheReady }),
      setCachedDataVersion: (cachedDataVersion) => set({ cachedDataVersion }),
      
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'dishasetu-storage',
      partialize: (state) => ({
        user: state.user,
        language: state.language,
        quizAnswers: state.quizAnswers,
        quizResult: state.quizResult,
        careerStep: state.careerStep,
        cachedDataVersion: state.cachedDataVersion,
      }),
    }
  )
);
