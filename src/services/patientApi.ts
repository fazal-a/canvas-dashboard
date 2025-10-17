import axios from 'axios';
import { PatientData } from '@/types/onboarding';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const patientApi = {
    // Individual section APIs
    createPatientWho: async (data: any) => {
        const response = await api.post('/patients/who', data);
        return response.data;
    },

    createPatientContact: async (patientId: string, data: any) => {
        const response = await api.post(`/patients/${patientId}/contact`, data);
        return response.data;
    },

    createPatientChoices: async (patientId: string, data: any) => {
        const response = await api.post(`/patients/${patientId}/choices`, data);
        return response.data;
    },

    createPatientProvider: async (patientId: string, data: any) => {
        const response = await api.post(`/patients/${patientId}/provider`, data);
        return response.data;
    },

    createPatientStats: async (patientId: string, data: any) => {
        const response = await api.post(`/patients/${patientId}/stats`, data);
        return response.data;
    },

    createPatientGuardian: async (patientId: string, data: any) => {
        const response = await api.post(`/patients/${patientId}/guardian`, data);
        return response.data;
    },

    createPatientEmployer: async (patientId: string, data: any) => {
        const response = await api.post(`/patients/${patientId}/employer`, data);
        return response.data;
    },

    // Bulk create patient with all sections
    createPatientComplete: async (data: PatientData) => {
        const response = await api.post('/patients/complete', data);
        return response.data;
    },
};
