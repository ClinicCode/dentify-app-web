import { createRouter, createWebHistory } from "vue-router";

// Layout público
import MainLayout from "../public/layout/main-layout.component.vue";
import NotFound from "../public/not-found.component.vue";
import DashboardPage from "../modules/dashboard/pages/DashboardPage.vue";
import PatientsPage from "../modules/patients/pages/PatientPage.vue";
// Módulos
/*
import LoginPage from "../modules/iam/pages/LoginPage.vue";
import RegisterPage from "../modules/iam/pages/RegisterPage.vue";


import AppointmentsPage from "../modules/appointments/pages/AppointmentsPage.vue";
import PaymentsPage from "../modules/payments/pages/PaymentsPage.vue";
import InventoryPage from "../modules/inventory/pages/InventoryPage.vue";
import ProfilePage from "../modules/profile/pages/ProfilePage.vue";
*/
const routes = [
    { path: "/", redirect: "/home" }, //cambiar a login
   // { path: "/login", component: LoginPage, name: "login" },
   // { path: "/register", component: RegisterPage, name: "register" },
    {
        path: "/home",
        component: MainLayout,
        children: [
            { path: "dashboard", component: DashboardPage, name: "dashboard" },
           { path: "patients", component: PatientsPage, name: "patients" },
            //{ path: "appointments", component: AppointmentsPage, name: "appointments" },
            //{ path: "payments", component: PaymentsPage, name: "payments" },
           // { path: "inventory", component: InventoryPage, name: "inventory" },
            //{ path: "profile", component: ProfilePage, name: "profile" }
        ]
    },


    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
