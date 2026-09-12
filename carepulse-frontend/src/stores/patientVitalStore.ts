import { defineStore } from 'pinia';
import { ref } from 'vue';
import { httpClient } from '../services/httpClient';
import type { PatientVital } from '../types';

export const useVitalsStore = defineStore('vitals', () => {
  const vitals = ref<PatientVital[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchVitals = async (patientId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get<PatientVital[]>(`/webhooks/patient/${patientId}`);
      vitals.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch patient vitals';
    } finally {
      loading.value = false;
    }
  };

  const addVital = (vital: PatientVital) => {
    if (!vitals.value.some((v) => v.id === vital.id)) {
      vitals.value.unshift(vital);
    }
  };

  return { vitals, loading, error, fetchVitals, addVital };
});