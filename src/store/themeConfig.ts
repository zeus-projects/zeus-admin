import { defineStore } from 'pinia';

export const useThemeConfig = defineStore('themeConfig', {
   persist: true,
   state: (): ThemeConfigState => ({
      themeConfig: {
         // 菜单是否折叠
         isAsideCollapse: false
      },
   }),
   getters: {
      getAsideWidth(state) {
         return state.themeConfig.isAsideCollapse ? "64px" : "250px"
      }
   },
   actions: {
      setThemeConfig(data: ThemeConfigState) {
         this.themeConfig = data.themeConfig;
      },
      // 侧边栏折叠与展开切换
      handleAsideCollapse() {
         this.themeConfig.isAsideCollapse = !this.themeConfig.isAsideCollapse
      }
   }
});
