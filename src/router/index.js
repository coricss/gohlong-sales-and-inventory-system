import { createRouter, createWebHistory } from 'vue-router';

const appName = 'Gohlong Tire and Service Center';

const routes = [
    {
      path: '/',
      name: appName,
      component: import('@/pages/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'Login | ' + appName,
      component: import('@/pages/LogIn.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard | ' + appName,
      component: import('@/pages/Dashboard.vue')
    },
    {
      path: '/user-management',
      name: 'User Management | ' + appName,
      component: import('@/pages/UserManagement.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Page Not Found',
        component: () => import('@/components/server-error/404.vue')
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { el: to.hash };
      }
      return { left: 0, top: 0 };
    }
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router