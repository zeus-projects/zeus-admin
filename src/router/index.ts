import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '@/views/index.vue'
import Login from '@/views/login.vue'
import NotFound from '@/views/error/404.vue'
import { useToken, useNotification, showFullLoading, hideFullLoading } from '@/hooks'
import Admin from "@/layouts/admin.vue"

const routes = [{
      path: '/',
      component: Admin,
      children: [{
         path: '/',
         name: '首页',
         component: Index,
         meta: {
            title: "首页"
         }
      }]
   },
   {
      path: '/login',
      name: '登录页面',
      component: Login,
      meta: {
         title: "登录页面"
      }
   },
   {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
         title: "404"
      }
   },
]

const router = createRouter({
   // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHashHistory(),
   routes, // `routes: routes` 的缩写
})

// 导航守卫
router.beforeEach((to, from, next) => {
   // loading
   showFullLoading()
   const token = useToken().getToken()
   // 未登录跳转至登录
   if (!token && to.path != "/login") {
      useNotification().error("请先登录！")
      return next({ path: "/login" })
   }
   // 防止重复登录
   if (token && to.path == "/login") {
      return next({ path: from.path ? from.path : "/" })
   }
   // 根据路由信息设置页面的 title
   let title = (to.meta.title ? to.meta.title : "") + "-ZeusAdmin"
   document.title = title
   // 跳转路由
   next()
})

router.afterEach(() => {
   // 关闭 loading
   hideFullLoading()
})

export default router