import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/admin/menu',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NotFound',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    redirect: '/dashboard/workplace',
    meta: {
      title: t('router.dashboard')
    },
    children: [
      {
        path: 'workplace',
        component: () => import('@/views/Dashboard/Workplace.vue'),
        name: 'Workplace',
        meta: {
          title: t('router.workplace'),
          icon: 'ant-design:dashboard-filled',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dept',
    name: 'Admin',
    meta: {
      title: t('router.admin'),
      icon: 'eos-icons:role-binding',
      alwaysShow: true
    },
    children: [
      {
        path: 'dept',
        component: () => import('@/views/Admin/Dept/Dept.vue'),
        name: 'Dept',
        meta: {
          title: t('router.dept')
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/Admin/Menu/Menu.vue'),
        name: 'Menu',
        meta: {
          title: t('router.menuManagement')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NotFound', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
