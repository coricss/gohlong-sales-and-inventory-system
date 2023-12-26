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
      path: '/inventory-stocks',
      name: 'Inventory Stocks | ' + appName,
      component: () => import('@/components/inventory-tables/InventoryStocks.vue'),
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
      path: '/point-of-sales',
      name: 'Point of Sales | ' + appName,
      component: () => import('@/pages/PointOfSales.vue'),
    },
    {
      path: '/sales',
      name: 'Sales | ' + appName,
      component: () => import('@/pages/Sales.vue'),
    },
    {
      path: '/logs',
      name: 'Logs | ' + appName,
      component: () => import('@/pages/Logs.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Page Not Found',
        component: () => import('@/components/server-error/404.vue')
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
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

router.beforeEach((to, from, next) => {
  var checkToken = localStorage.getItem("token")
  if ((to.name !== 'Login | ' + appName) && (to.name !== appName)) {
    if (!checkToken) {
      next({ name: 'Login | ' + appName })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* roles */
router.afterEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"))

  if(to.name === 'User Management | ' + appName || to.name === 'Logs | ' + appName) {
    if (user.role !== 'super_admin') {
      router.push({ name: 'Dashboard | ' + appName })
    }
  } else if (to.name === 'Inventory Stocks | ' + appName || to.name === 'Manage Products | ' + appName || to.name === 'Manage Categories | ' + appName || to.name === 'Manage Brands | ' + appName ) {
    if (user.role !== 'admin') {
      router.push({ name: 'Dashboard | ' + appName })
    }
  } else if (to.name === 'Point of Sales | ' + appName) {
    if (user.role !== 'user') {
      router.push({ name: 'Dashboard | ' + appName })
    }
  } else if (to.name === 'Sales | ' + appName) {
    if (user.role === 'super_admin') {
      router.push({ name: 'Dashboard | ' + appName })
    }
  }
});

export default router