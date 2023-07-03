import { defineStore } from 'pinia'
import { getInfo, login as loginApi } from '@/service/api/admin'
import { useToken } from '@/hooks/token'

// 持久化参考 https://seb-l.github.io/pinia-plugin-persist
export const useUserInfoStore = defineStore('userInfo', {
   state: () => ({
      user: {
         menus: [],
         ruleNames: []
      }
   }),
   actions: {
      setUserInfo() {
         return new Promise((resolve, reject)=> {
            getInfo().then((res: any) => {
               this.user = res
               resolve(res)
            }).catch(err => reject(err))
         })
      },
      login({ username, password }) {
         return new Promise((resolve, reject) => {
            loginApi(username, password).then((res) => {
                  useToken().setToken(res.token)
                  this.setUserInfo()
                  resolve(res)
               }).catch(err => reject(err))
         })
      },
      logout() {
         return new Promise(() => {
            // 清除 cookie
            useToken().removeToken()
            // 清除 localstorage 的用户信息，设置为空对象而不是 null，防止其他 header 组件中通过 user.avatar 获取头像报错
            this.user =  {
               menus: [],
               ruleNames: []
            }
         })
      }
   },
   persist: {
      enabled: true,
      strategies: [{
         // 自定义存储的 key，默认是 store.$id
         // key: "userInfo",
         // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
         storage: localStorage,
         // state 中的字段名，按组打包储存
         // paths: ["foo", "bar"]
      }]
   }
})