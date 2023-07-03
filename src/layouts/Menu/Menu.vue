<template>
<div class="layout-menu" :style="{width: useThemeConfig().getAsideWidth}">
   <el-menu
      unique-opened
      :collapse-transition="false" 
      @select="handleSelect" 
      :collapse="useThemeConfig().themeConfig.isAsideCollapse"
      :default-active="defaultActive"
   >
      <template v-for="(item, index) in asideMenus" :key="index">
         <!-- 有二级菜单 -->
         <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
            <template #title>
               <el-icon>
                  <component :is="item.icon"></component>
               </el-icon>
               <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
               <template #title>
                  <el-icon>
                     <component :is="item2.icon"></component>
                  </el-icon>
                  <span>{{ item2.name }}</span>
               </template>
            </el-menu-item>
         </el-sub-menu>
         <!-- 仅一级菜单 -->
         <el-menu-item v-else :index="item.frontpath">
            <el-icon>
               <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
         </el-menu-item>
      </template>
   </el-menu>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';
import { useThemeConfig } from '@/store/themeConfig';
import { useUserInfoStore } from '@/store/userInfo';

const router = useRouter();
const route = useRoute()
// 默认选中当前路由路径
const defaultActive = ref(route.path)
const asideMenus = useUserInfoStore().user.menus
const handleSelect = (path) => router.push(path)
</script>

<style lang="postcss">
.el-menu {
   border: none;
}

.layout-menu {
   transition: all 0.2s;
   top: 64px;
   bottom: 0;
   left:0;
   overflow-y: auto;
   overflow-x: hidden;
   @apply shadow-md fixed  bg-light-50;
}

.layout-menu::-webkit-scrollbar {
   width: 0px;
}
</style>