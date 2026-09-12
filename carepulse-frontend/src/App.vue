<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import VitalToast from './components/VitalToast.vue';
import { onMounted, onUnmounted } from 'vue';
import { useToastStore } from './stores/toast.ts';
import type { PatientVital } from './types/index.ts';
import { socket } from './services/socket';

const toastStore = useToastStore();

onMounted(() => {
  socket.connect();

  socket.on('global_vital_alert', (incomingVital: PatientVital) => {
    toastStore.pushVitalToast(incomingVital);
  });
});

onUnmounted(() => {
  socket.off('global_vital_alert');
  socket.disconnect();
});
</script>

<template>
  <div class="min-h-screen bg-dark-300">
    <header class="border-b border-slate-800 bg-dark-200/50 backdrop-blur sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span class="text-green-500">Care</span>Pulse
        </div>
        <nav class="flex items-center gap-6 text-sm font-medium">
          <RouterLink to="/patients" class="text-slate-300 hover:text-white transition-colors" active-class="text-green-500">Patients</RouterLink>
          <RouterLink to="/register" class="text-slate-300 hover:text-white transition-colors" active-class="text-green-500">Register</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <VitalToast />
  </div>
</template>