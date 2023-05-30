import { defineStore } from 'pinia'
import { getInfo, login as loginApi } from '@/api/auth.js'
import { notifyError } from "@/util/notify";
import { setToken } from '@/util/auth'

export const useUserStore = defineStore('userInfo', {
  persist: true,
  state: () => ({
     user: ''
  }),
  getters: {
    getUser: state => state.user
  },
  actions: {
    async login({username, password}) {
      return new Promise((resolve, reject)=>{
        loginApi(username, password)
        .then((res)=>{
          setToken(res.token)
          getInfo().then((res) => {
            this.user = res
          })
          resolve(res)
        })
        .catch((err) => {
          notifyError(err.msg ? err.msg : '系统异常请联系管理员')
          reject(err);
        });
      })
    }
  },
})