import { defineStore } from 'pinia';
import { ref } from 'vue';
import { httpClient } from '../services/httpClient';
import type { Patient, CreatePatientInput } from '../types';

export const usePatientStore = defineStore('patient', () => {
  const patients = ref<Patient[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPatients = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get<Patient[]>('/patients');
      patients.value = response.data;
    } catch (err: any) {
        console.log(err);
      error.value = err.response?.data?.error || 'Failed to fetch patients';
    } finally {
      loading.value = false;
    }
  };

  const registerPatient = async (payload: CreatePatientInput) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.post<Patient>('/patients', payload);
      patients.value.unshift(response.data);
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to register patient';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  return { patients, loading, error, fetchPatients, registerPatient };
});