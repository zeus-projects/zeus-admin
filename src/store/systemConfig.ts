import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system-config', {
   persist: true,
   state: () => ({
      TokenKey: 'admin-token'
   }),
   actions: {
      setTokenKey(key) {
         this.TokenKey = key;
      },
   },
});
