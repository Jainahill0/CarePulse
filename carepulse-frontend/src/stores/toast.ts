import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PatientVital } from '../types';

export interface VitalToast {
  id: string;
  vital: PatientVital;
  timestamp: Date;
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<VitalToast[]>([]);

  const pushVitalToast = (vital: PatientVital) => {
    const toastItem: VitalToast = {
      id: `${vital.id || Date.now()}-${Math.random()}`,
      vital,
      timestamp: new Date(),
    };

    toasts.value.unshift(toastItem);

    setTimeout(() => {
      removeToast(toastItem.id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return { toasts, pushVitalToast, removeToast };
});