import { createRouter, createWebHashHistory } from 'vue-router';
import { useToken, useNotification, showFullLoading, hideFullLoading } from '@/hooks'
import { useLoginStore } from '@/store/userInfo';
import Login from '@/views/login.vue'
import NotFound from '@/views/error/404.vue'
import Admin from "@/layouts/admin.vue"

const dynamicRoutes = [
   {
      path: '/',
      name: 'admin',
      component: Admin,
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
   }
]

// router 实例
export const router = createRouter({
   // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHashHistory(),
   routes: dynamicRoutes
})

export function addRoutes(menus: Number[]) {
   console.log(menus);
   let refresh = false
   const findAndAddRoutesByMenus = (arr) => {
      arr.forEach(e => {
         // 判断是否存在该路由
         let item = dynamicRoutes.find(o => o.path == e.frontpath)
         if (item && router.hasRoute(item.path)) {
            // 存在就添加到路由中
            router.addRoute("admin", item)
            refresh = true
         }
         // 判断是否有子路由，有则也加入路由
         if (e.child && e.child.length > 0) {
            findAndAddRoutesByMenus(e.child)
         }
      })
   }
   findAndAddRoutesByMenus(menus)
   console.log('router.getRoutes():');
   console.log(router.getRoutes());
   return refresh
}

// 导航守卫
router.beforeEach((to, from, next) => {
   // loading
   showFullLoading()
   const token = useToken().getToken()
   const authStore = useLoginStore()
   // 未登录跳转至登录
   if (!token && to.path != "/login") {
      useNotification().error("请先登录！")
      return next({ path: "/login" })
   }
   // 防止重复登录
   if (token && to.path == "/login") {
      return next({ path: from.path ? from.path : "/" })
   }
   // 初始化动态路由
   let refresh = false
   console.log(token);
   if (token) {
      console.log('初始化动态路由');
      authStore.setUserInfo().then((res: any) => {
         console.log(res);
         refresh = addRoutes(res.menus)
      })
   }
   // 根据路由信息设置页面的 title
   let title = (to.meta.title ? to.meta.title : "") + "-ZeusAdmin"
   document.title = title
   // 跳转路由
   refresh ? next(to.fullPath) : next()
})

router.afterEach(() => {
   // 关闭 loading
   hideFullLoading()
})

