<template>
   <div class="f-header">
      <!-- 左侧 -->
      <span class="logo">
         <el-icon class="mr-1"><SwitchFilled /></el-icon>
         <span>Zeus-Admin</span>
      </span>
      <el-icon class="icon-btn" @click="themeStore.handleAsideCollapse()">
         <Fold v-if="themeStore.themeConfig.isAsideCollapse"/>
         <Expand v-else/>
      </el-icon>
      <el-tooltip effect="dark" content="刷新" placement="bottom">
         <el-icon class="icon-btn" @click="handleRefresh()"><Refresh /></el-icon>
      </el-tooltip>
      <!-- 右侧 -->
      <div class="ml-auto flex justify-center">
         <!-- 全屏按钮 -->
         <el-tooltip effect="dark" content="全屏" placement="bottom">
            <el-icon class="icon-btn" @click="toggle">
               <FullScreen v-if="!isFullscreen"/>
               <Aim v-else/>
            </el-icon>
         </el-tooltip>
         <!-- 下拉框 -->
         <el-dropdown class="dropdown" @command="handleCommand">
            <span class="flex items-center text-lime-50">
               <el-avatar class="mr-2" :size="30" :src="store.user.avatar" />
               {{ store.user.username }}
               <el-icon class="el-icon--right">
                  <arrow-down />
               </el-icon>
            </span>
            <template #dropdown>
               <el-dropdown-menu>
                  <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
               </el-dropdown-menu>
            </template>
         </el-dropdown>
      </div>
   </div>
   <Drawer ref="drawerRef" title="修改密码" destoryOnClose @submit="onSubmit">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
         <el-form-item prop="oldPassword" label="旧密码">
            <el-input v-model="form.oldPassword" type="password" show-password placeholder="请输入旧密码"></el-input>
         </el-form-item>
         <el-form-item prop="password" label="新密码">
            <el-input v-model="form.password" type="password" show-password placeholder="请输入新密码"></el-input>
         </el-form-item>
         <el-form-item prop="repassword" label="确认密码">
            <el-input v-model="form.repassword" type="password" show-password placeholder="请输入确认密码"></el-input>
         </el-form-item>
      </el-form>
   </Drawer>

</template>

<script setup>
import Drawer from '@/components/common/drawer.vue';
import { useFullscreen } from "@vueuse/core";
import { useUpdatepassword, useLogout, store } from './header';
import { useThemeConfig } from '@/store/themeConfig';

const {
   isFullscreen,
   toggle
} = useFullscreen()
const {
   drawerRef,
   formRef,
   form,
   rules,
   openDrawer,
   closeDrawer,
   onSubmit
} = useUpdatepassword()

const themeStore = useThemeConfig()

const { handleLogout } = useLogout()

// 下拉框事件
const handleCommand = (c) => {
   switch (c) {
      case "updatePassword":
         openDrawer()
         break;
      case "logout":
         handleLogout()
         break;
   }
}

// 刷新事件
const handleRefresh = ()=> {
   location.reload()
}
</script>

<style lang="postcss">
.f-header {
   @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 items-center;
   height: 64px;
}

.logo {
   width: 250px;
   @apply flex justify-center items-center text-xl;
}

.icon-btn {
   @apply flex justify-center items-center;
   width: 42px;
   height: 64px;
   cursor: pointer;
}

.icon-btn:hover {
   @apply bg-indigo-600;
}

.f-header .dropdown {
   height: 64px;
   cursor: pointer;
   @apply flex justify-center items-center mx-5;
}
</style>