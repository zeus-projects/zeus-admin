import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system-config', {
   state: () => ({
      TokenKey: 'admin-token'
   }),
   actions: {
      setTokenKey(key) {
         this.TokenKey = key;
      },
   },
});
