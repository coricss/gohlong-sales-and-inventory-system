import { createRouter, createWebHistory } from 'vue-router';

const LandingPage = () => import('@/pages/LandingPage.vue');
const LogIn = () => import('@/pages/LogIn.vue');
const Dashboard = () => import('@/pages/Dashboard.vue');
const UserManagement = () => import('@/pages/UserManagement.vue');

const routes = [
    {
      path: '/',
      redirect: {path: '/'},
      component: LandingPage,
      children: [
        {
          path: '/',
          name: 'home',
          title: 'Home',
          component: LandingPage 
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/user-management',
      name: 'user-management',
      component: UserManagement
    },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router