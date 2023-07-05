import { defineStore } from 'pinia';

interface AppState {
   userInfo: {
      menus: any[]
   },
   style: {
      isAsideCollapse: boolean
   },
   theme: {
      
   }
}

export const useAppStore = defineStore('app', {
   state: (): AppState => ({
      userInfo: {
         menus: []
      },
      style: {
         isAsideCollapse: false
      },
      theme: {
         
      },
   }),
   getters: {
      
   },
   actions: {

   },
   persist: {
      enabled: true,
      strategies: [{
         storage: localStorage
      }]
   }
});