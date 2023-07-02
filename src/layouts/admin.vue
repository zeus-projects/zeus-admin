<template>
   <el-container>
      <el-header>
         <LayoutHeader />
      </el-header>
      <el-container>
         <el-aside :width="useThemeConfig().getAsideWidth">
            <LayoutAside />
         </el-aside>
         <el-main>
            <LayoutTags />
            <router-view></router-view>
         </el-main>
      </el-container>
   </el-container>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useThemeConfig } from '@/store/themeConfig'

const LayoutHeader = defineAsyncComponent(() => import('@/layouts/Header'));
const LayoutAside = defineAsyncComponent(()=> import('@/layouts/Aside'));
const LayoutTags = defineAsyncComponent(() => import('@/layouts/TagList'));
</script>

<style>
.el-aside {
   transition: all 0.2s;
}
</style>