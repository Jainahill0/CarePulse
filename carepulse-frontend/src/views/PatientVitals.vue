<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useVitalsStore } from '../stores/patientVitalStore';
import { socket } from '../services/socket';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Wind, 
  ArrowLeft, 
  Radio, 
  RefreshCw 
} from 'lucide-vue-next';
import type { PatientVital } from '../types';

const route = useRoute();
const vitalsStore = useVitalsStore();
const patientId = computed(() => route.params.id as string);
const latestVital = computed(() => vitalsStore.vitals[0] || null);

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const refreshData = () => {
  if (patientId.value) {
    vitalsStore.fetchVitals(patientId.value);
  }
};


onMounted(() => {
  refreshData();
  socket.on('new_vitals', (incomingVital: PatientVital) => {
      vitalsStore.addVital(incomingVital);
  });
});

onUnmounted(() => {
  socket.emit('leave_patient', patientId.value);
  socket.off('new_vitals');
  socket.disconnect();
});

</script>

<template>
  <div class="max-w-6xl mx-auto py-10 px-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <RouterLink
          to="/patients"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-3 uppercase tracking-wider"
        >
          <ArrowLeft class="w-4 h-4" /> Back to Registry
        </RouterLink>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Patient Telemetry</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live Sync
          </span>
        </div>
        <p class="text-xs font-mono text-slate-500 mt-1">ID: {{ patientId }}</p>
      </div>

      <button
        @click="refreshData"
        :disabled="vitalsStore.loading"
        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-200 border border-slate-700/60 rounded-lg text-sm font-medium text-slate-200 hover:bg-dark-400 transition-colors cursor-pointer disabled:opacity-50"
      >
        <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': vitalsStore.loading }" />
        Sync Telemetry
      </button>
    </div>

    <div v-if="vitalsStore.error" class="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
      {{ vitalsStore.error }}
    </div>

    <div v-if="latestVital" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div class="bg-dark-200 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 mb-3">
          <span class="text-xs font-semibold tracking-wider uppercase">Heart Rate</span>
          <Heart class="w-5 h-5 text-red-400" />
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-bold text-white">{{ latestVital.heartRate ?? '—' }}</span>
          <span class="text-xs text-slate-500 font-medium">BPM</span>
        </div>
        <span 
          v-if="latestVital.heartRate && (latestVital.heartRate > 100 || latestVital.heartRate < 60)"
          class="mt-3 inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
        >
          Check Rhythm
        </span>
        <span v-else class="mt-3 inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20">
          Optimal
        </span>
      </div>

      <div class="bg-dark-200 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 mb-3">
          <span class="text-xs font-semibold tracking-wider uppercase">Blood Pressure</span>
          <Activity class="w-5 h-5 text-blue-400" />
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold text-white">
            {{ latestVital.systolicBp && latestVital.diastolicBp ? `${latestVital.systolicBp}/${latestVital.diastolicBp}` : '—' }}
          </span>
          <span class="text-xs text-slate-500 font-medium ml-1">mmHg</span>
        </div>
        <span class="mt-3 inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Systolic / Diastolic
        </span>
      </div>
    </div>

    <div v-else-if="!vitalsStore.loading" class="text-center py-16 bg-dark-200 border border-slate-800/80 rounded-xl mb-10">
      <Radio class="w-10 h-10 text-slate-600 mx-auto mb-3" />
      <h3 class="text-lg font-semibold text-white">No Telemetry Stream Detected</h3>
      <p class="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
        Waiting for device payload on webhook <code>/api/v1/webhooks/device-vitals</code>.
      </p>
    </div>

    <div>
      <h2 class="text-lg font-semibold text-white mb-4">Device Ingestion History</h2>
      <div class="bg-dark-200 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="bg-dark-400/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th class="px-6 py-4">Recorded At</th>
              <th class="px-6 py-4">Device Source</th>
              <th class="px-6 py-4">Heart Rate</th>
              <th class="px-6 py-4">Blood Pressure</th>
              <th class="px-6 py-4">SpO2</th>
              <th class="px-6 py-4">Temperature</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="vital in vitalsStore.vitals" :key="vital.id" class="hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 font-mono text-xs text-slate-300">{{ formatDate(vital.recordedAt) }}</td>
              <td class="px-6 py-4 font-mono text-xs text-slate-400">{{ vital.deviceId }}</td>
              <td class="px-6 py-4 font-medium text-white">{{ vital.heartRate ? `${vital.heartRate} BPM` : '—' }}</td>
              <td class="px-6 py-4">{{ vital.systolicBp && vital.diastolicBp ? `${vital.systolicBp}/${vital.diastolicBp}` : '—' }}</td>
            </tr>
            <tr v-if="vitalsStore.vitals.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                No logs ingested for this patient identifier.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

