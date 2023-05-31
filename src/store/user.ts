import { defineStore } from 'pinia'
import { getInfo, login as loginApi } from '@/api/admin'
import { useToken } from '@/hooks/auth'
// import { useMessageBox, useNotification } from "@/hooks/message";

export const useUserStore = defineStore('userInfo', {
  persist: true,
  state: () => ({
    user: ''
  }),
  getters: {
    getUser: state => state.user
  },
  actions: {
    setUserInfo(info) {
      this.user = info
    },
    async login({ username, password }) {
      return new Promise((resolve, reject) => {
        loginApi(username, password)
          .then((res) => {
            useToken().setToken(res.token)
            getInfo().then((res) => {
              this.setUserInfo(res)
            })
            resolve(res)
          })
          .catch((err) => {
            reject(err);
          });
      })
    },
    async logout() {
      return new Promise(() => {
         // logout().finally(() => {
         //    store.logout()
         //    router.push("/login")
         //    notify.success("退出登录成功")
         // })
         // 清除 cookie
         useToken().removeToken()
         // 清除 localstorage 的用户信息，设置为空对象而不是 null，防止其他 header 组件中通过 user.avatar 获取头像报错
         this.setUserInfo({})
      })
    }
  },
})