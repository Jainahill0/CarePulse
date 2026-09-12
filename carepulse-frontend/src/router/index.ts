import { createRouter, createWebHistory } from 'vue-router';
import PatientList from '../views/PatientList.vue';
import RegisterPatient from '../views/RegisterPatient.vue';
import PatientVitals from '../views/PatientVitals.vue';

const routes = [
  { path: '/', redirect: '/patients' },
  { path: '/patients', component: PatientList },
  { path: '/register', component: RegisterPatient },
  { path: '/patients/:id/vitals', component: PatientVitals },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});