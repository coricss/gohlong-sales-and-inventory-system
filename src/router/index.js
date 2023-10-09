import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/store/auth';

const appName = 'Gohlong Tire and Service Center';

const routes = [
    {
      path: '/',
      name: appName,
      component: () => import('@/pages/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'Login | ' + appName,
      component: () => import('@/pages/LogIn.vue')
    },
    {
      path: '/profile',
      name:  'Profile | ' + appName,
      component: () => import('@/pages/Profile.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard | ' + appName,
      component: () => import('@/pages/Dashboard.vue')
    },
    {
      path: '/user-management',
      name: 'User Management | ' + appName,
      component: () => import('@/pages/UserManagement.vue')
    },
    {
      path: '/inventory/products',
      name: 'Manage Products | ' + appName,
      component: () => import('@/components/inventory-tables/ProductsTable.vue'),
    },
    {
      path: '/inventory/categories',
      name: 'Manage Categories | ' + appName,
      component: () => import('@/components/inventory-tables/CategoriesTable.vue'),
    },
    {
      path: '/inventory/brands',
      name: 'Manage Brands | ' + appName,
      component: () => import('@/components/inventory-tables/BrandsTable.vue'),
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

router.afterEach((to, from) => {
  var checkToken = sessionStorage.getItem("token")
  if ((to.name !== 'Login | ' + appName) && (to.name !== appName)) {
      if (!checkToken) {
          window.location.href = '/login'
      }
  }
})

export default router