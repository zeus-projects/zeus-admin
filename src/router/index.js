import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/index.vue'
import Login from '@/views/login.vue'
import NotFound from '@/views/error/404.vue'

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

export default router