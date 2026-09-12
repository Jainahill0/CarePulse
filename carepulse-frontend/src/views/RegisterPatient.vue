<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePatientStore } from '../stores/patient';

const router = useRouter();
const patientStore = usePatientStore();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
});

const formError = ref<string | null>(null);

const handleSubmit = async () => {
  formError.value = null;
  if (!form.name || !form.email) {
    formError.value = 'Name and email are required.';
    return;
  }

  try {
    await patientStore.registerPatient({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      birthDate: form.birthDate || undefined,
    });
    router.push('/patients');
  } catch (err: any) {
    formError.value = err;
  }
};
</script>

<template>
  <div class="max-w-xl mx-auto py-12 px-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-white">Register Patient</h1>
      <p class="text-slate-400 mt-2 text-sm">Add patient details to the CarePulse registry.</p>
    </div>

    <div v-if="formError" class="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
      {{ formError }}
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Full Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Eleanor Vance"
          class="w-full px-4 py-3 bg-dark-200 border border-slate-700/60 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-500"
          required
        />
      </div>

      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="eleanor@example.com"
          class="w-full px-4 py-3 bg-dark-200 border border-slate-700/60 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-500"
          required
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Phone</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+1 555-0199"
            class="w-full px-4 py-3 bg-dark-200 border border-slate-700/60 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Birth Date</label>
          <input
            v-model="form.birthDate"
            type="date"
            class="w-full px-4 py-3 bg-dark-200 border border-slate-700/60 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors text-slate-300"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="patientStore.loading"
        class="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors cursor-pointer"
      >
        <span v-if="patientStore.loading">Saving...</span>
        <span v-else>Register Patient</span>
      </button>
    </form>
  </div>
</template>