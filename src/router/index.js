import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/index.vue'
import Login from '@/views/login.vue'
import NotFound from '@/views/error/404.vue'
import { getToken } from '@/util/auth'
import { notifyError } from "@/util/notify";

const routes = [
  { 
    path: '/',
    name: '首页',
    // redirect: '/login',
    component: Home
  },
  {
    path: '/login',
    name: '登录页面',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  // 未登录跳转至登录
  if (!token && to.path != "/login") {
    notifyError("请先登录！")
    return next({ path: "/login" })
  }
  // 防止重复登录
  if (token && to.path == "/login"){
    return next({path: from.path ? from.path : "/"})
  }
  // 放过
  next()
})

export default router