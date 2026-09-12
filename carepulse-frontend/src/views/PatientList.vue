<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { usePatientStore } from '../stores/patient';

const patientStore = usePatientStore();

onMounted(() => {
  patientStore.fetchPatients();
});
</script>

<template>
  <div class="max-w-6xl mx-auto py-12 px-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-white">Patients</h1>
        <p class="text-slate-400 mt-1 text-sm">Real-time registry of all active patients.</p>
      </div>
      <RouterLink
        to="/register"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
      >
        Add Patient
      </RouterLink>
    </div>

    <div v-if="patientStore.loading" class="text-slate-400 text-sm py-12 text-center">
      Loading patient records...
    </div>

    <div v-else-if="patientStore.error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
      {{ patientStore.error }}
    </div>

    <div v-else class="bg-dark-200 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-300">
        <thead class="bg-dark-400/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">Phone</th>
            <th class="px-6 py-4">Birth Date</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <tr v-for="patient in patientStore.patients" :key="patient.id" class="hover:bg-slate-800/30 transition-colors">
            <td class="px-6 py-4 font-medium text-white">{{ patient.name }}</td>
            <td class="px-6 py-4">{{ patient.email }}</td>
            <td class="px-6 py-4">{{ patient.phone || '—' }}</td>
            <td class="px-6 py-4">{{ patient.birthDate || '—' }}</td>
            <td class="px-6 py-4 text-right">
              <RouterLink
                :to="`/patients/${patient.id}/vitals`"
                class="text-green-500 hover:text-green-400 font-medium text-xs border border-green-500/30 px-3 py-1.5 rounded-md hover:bg-green-500/10 transition-colors"
              >
                View Telemetry
              </RouterLink>
            </td>
          </tr>
          <tr v-if="patientStore.patients.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-slate-500">
              No patients registered yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>