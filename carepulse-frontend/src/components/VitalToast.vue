<script setup lang="ts">
import { useToastStore } from '../stores/toast';
import { Activity, X, Heart, Wind, Thermometer } from 'lucide-vue-next';

const toastStore = useToastStore();
</script>

<template>
  <div 
    style="position: fixed; bottom: 20px; left: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 12px; width: 360px; max-width: calc(100vw - 40px); pointer-events: none;"
  >
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      style="pointer-events: auto; background-color: #1A1D21; border: 1px solid #334155; border-radius: 12px; padding: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); color: #f8fafc;"
    >
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(36, 174, 124, 0.2); border: 1px solid #24AE7C; display: flex; align-items: center; justify-content: center; color: #24AE7C;">
            <Activity style="width: 18px; height: 18px;" />
          </div>
          <div>
            <!-- Patient Name -->
            <div style="font-size: 14px; font-weight: 700; color: #ffffff;">
              {{ toast.vital.patient?.name || 'Unknown Patient' }}
            </div>
            <!-- Subtitle with device and status -->
            <div style="font-size: 11px; color: #94a3b8; font-family: monospace;">
              {{ toast.vital.deviceId }} &bull; Live Telemetry
            </div>
          </div>
        </div>

        <button
          @click="toastStore.removeToast(toast.id)"
          style="background: transparent; border: none; color: #94a3b8; cursor: pointer; padding: 4px;"
        >
          <X style="width: 16px; height: 16px;" />
        </button>
      </div>

      <!-- Vitals Metrics -->
      <div style="display: flex; gap: 16px; font-size: 13px; padding-top: 8px; border-top: 1px solid #262c36;">
        <div v-if="toast.vital.heartRate" style="display: flex; align-items: center; gap: 6px;">
          <Heart style="width: 14px; height: 14px; color: #f87171;" />
          <span><strong>{{ toast.vital.heartRate }}</strong> <span style="font-size: 10px; color: #64748b;">BPM</span></span>
        </div>
        <div v-if="toast.vital.systolicBp && toast.vital.diastolicBp" style="display: flex; align-items: center; gap: 6px;">
          <Activity style="width: 14px; height: 14px; color: #60a5fa;" />
          <span><strong>{{ toast.vital.systolicBp }}/{{ toast.vital.diastolicBp }}</strong> <span style="font-size: 10px; color: #64748b;">mmHg</span></span>
        </div>
        <!-- <div v-if="toast.vital.oxygenSaturation" style="display: flex; align-items: center; gap: 6px;">
          <Wind style="width: 14px; height: 14px; color: #22d3ee;" />
          <span><strong>{{ toast.vital.oxygenSaturation }}%</strong></span>
        </div> -->
      </div>
    </div>
  </div>
</template>