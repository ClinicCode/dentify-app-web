import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../modules/iam/stores/AuthStore.js';

// Components
import LoginComponent from '../modules/iam/components/LoginComponent.vue';
import RegisterComponent from '../modules/iam/components/RegisterComponent.vue';
import DashboardPage from '../modules/dashborad/page/dashaboard.vue';
import MainLayoutComponent from '../public/layout/main-layout.component.vue';
import NotFound from '../public//not-found.component.vue';
import PatientsPage from '../modules/patients/page/pateint.vue';
import ProfileComponent from "@/modules/iam/components/ProfileComponent.vue";

const routes = [
    { path: '/login', component: LoginComponent, name: 'login' },
    { path: '/register', component: RegisterComponent, name: 'register' },
    {
        path: '/home',
        component: MainLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardPage, name: 'dashboard' },
            {path: 'patients', component: PatientsPage, name: 'patients' },
            {path: 'profile', component: ProfileComponent, name: 'profile' },
        ],
        meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound }
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
