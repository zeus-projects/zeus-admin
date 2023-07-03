<template>
   <el-container>
      <el-header>
         <layout-header/>
      </el-header>
      <el-container>
         <el-aside :width="useThemeConfig().getAsideWidth">
            <layout-menu/>
         </el-aside>
         <el-main>
            <layout-tag/>
            <router-view v-slot="{ Component }">
               <transition name="fade">
                  <keep-alive :max="10">
                     <component :is="Component"></component>
                  </keep-alive>
               </transition>
            </router-view>
         </el-main>
      </el-container>
   </el-container>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useThemeConfig } from '@/store/themeConfig'

const LayoutHeader = defineAsyncComponent(() => import('@/layouts/Header'));
const LayoutMenu = defineAsyncComponent(()=> import('@/layouts/Menu'));
const LayoutTag = defineAsyncComponent(() => import('@/layouts/Tag'));
</script>

<style>
.el-aside {
   transition: all 0.2s;
}

.fade-enter-from {
   opacity: 0;
   -webkit-transform: translate3d(0, -100%, 0);
   transform: translate3d(0, -100%, 0);
}

.fade-enter-to {
   opacity: 1;
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}

.fade-leave-from {
   opacity: 1
}

.fade-leave-to {
   opacity: 0;
   -webkit-transform: translate3d(0, 100%, 0);
   transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
   transition: all 0.3s;
}

.fade-enter-active {
   transition-delay: 0.3s;
}
</style>