import { create } from 'zustand';
import { PatientData } from '@/types/onboarding';

interface PatientStore {
    patientData: PatientData;
    setPatientData: (data: PatientData) => void;
    updateSection: (section: string, data: any) => void;
    clearPatientData: () => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
    patientData: {},

    setPatientData: (data) => set({ patientData: data }),

    updateSection: (section, data) => set((state) => ({
        patientData: {
            ...state.patientData,
            [section]: data
        }
    })),

    clearPatientData: () => set({ patientData: {} }),
}));
