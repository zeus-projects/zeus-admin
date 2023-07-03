export const routes = [
   {
      path: '/',
      name: 'root',
      component: () => import('@/layouts/Layout.vue'),
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
      meta: {
         title: "登录页面"
      }
   },
   {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/error/404.vue'),
      meta: {
         title: "404 NotFound"
      }
   }
]

export const dynamicRoutes = [
   {
      path: '/goods/list',
      name: 'goods',
      component: () => import('@/views/goods/index.vue'),
      meta: {
         title: "商品管理"
      }
   }
]