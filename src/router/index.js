// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../modules/iam/stores/authStore.js';
import LoginComponent from '../modules/iam/components/LoginComponent.vue';
import RegisterComponent from '../modules/iam/components/RegisterComponent.vue';
import DashboardPage from '../modules/dashborad/page/dashaboard.vue'; //
import MainLayoutComponent from '../public/layout/main-layout.component.vue';
import NotFound from '../public/not-found.component.vue';
import ProfileComponent from '@/modules/iam/components/ProfileComponent.vue';
const PatientManagement = () => import('../modules/patients/pages/patients-management.component.vue');

const routes = [
    { path: '/login', component: LoginComponent, name: 'login' },
    { path: '/register', component: RegisterComponent, name: 'register' },
    {
        path: '/home',
        component: MainLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardPage, name: 'dashboard' },
            { path: 'profile', component: ProfileComponent, name: 'profile' },
            { path: 'patients', component: PatientManagement, name: 'patients' },
        ],
        meta: { requiresAuth: true },
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;