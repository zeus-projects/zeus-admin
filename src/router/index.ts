import { createRouter, createWebHashHistory } from 'vue-router';
import { useToken, useNotification, showFullLoading, hideFullLoading } from '@/hooks'
import { useUserInfoStore } from '@/store/userInfo'
import { routes, dynamicRoutes } from "./route";

/**
 * router 实例
 */
const router = createRouter({
   // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHashHistory(),
   routes: routes
})

export default router

/**
 * 添加动态路由
 * @param menus 菜单
 * @returns 是否更新了动态路由
 */
function addRoutes(menus) {
   let hasNewRoute = false
   const findAndAddRoutes = (arr) => {
      arr.forEach(e => {
         // 判断动态路由表中是否有这个菜单，比如要存在，才能跳转到具体的组件，从而加载页面
         let item = dynamicRoutes.find(o => o.path == e.frontpath)
         // 存在实际的组件，且该路由未被添加
         if (item && !router.hasRoute(item.path)) {
            // 添加到根路由下
            router.addRoute('root', item)
            hasNewRoute = true
         }
         // 递归遍历子菜单
         if (e.child && e.child.length > 0) {
            findAndAddRoutes(e.child)
         }
      })
   }
   findAndAddRoutes(menus)
   return hasNewRoute
}

/**
 * 导航守卫
 */
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
   // loading
   showFullLoading()
   const token = useToken().getToken()
   const authStore = useUserInfoStore()

   // 未登录强制跳转至登录页面
   if (!token && to.path != "/login") {
      useNotification().error("请先登录！")
      hasGetInfo = false
      return next({ path: "/login" })
   }

   // 已登陆时访问登录页跳转至首页，防止重复登录
   if (token && to.path == "/login") {
      return next({ path: from.path ? from.path : "/" })
   }

   // 添加动态路由
   let hasNewRoute = false
   if (token && !hasGetInfo) {
      await authStore.setUserInfo()
      hasNewRoute = addRoutes(authStore.user.menus)
      hasGetInfo = true
   }
   // 根据路由信息设置页面的 title
   let title = (to.meta.title ? to.meta.title : "Default") + "-ZeusAdmin"
   document.title = title
   hasNewRoute ? next(to.fullPath) : next()
})

router.afterEach(() => {
   // 关闭 loading
   hideFullLoading()
})