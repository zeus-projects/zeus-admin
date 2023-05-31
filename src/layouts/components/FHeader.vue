<template>
   <div class="f-header">
      <!-- 左侧 -->
      <span class="logo">
         <el-icon class="mr-1"><SwitchFilled /></el-icon>
         <span>Zeus-Admin</span>
      </span>
      <el-icon class="icon-btn"><Fold /></el-icon>
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
   <!-- 修改密码抽屉 -->
   <el-drawer v-model="drawer" title="修改密码" size="45%" :close-on-click-modal="false">
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
         <!-- 按钮 -->
         <el-form-item>
            <el-button type="primary" @click="submitUpdatePassword" :loading="loading">提交</el-button>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" >取消</el-button>
         </el-form-item>
       </el-form>
   </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { useMessageBox, useNotification } from "@/hooks/message";
import { updatePassword, logout } from "@/api/admin";
import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";

const router = useRouter()
const store = useUserStore()
const { isFullscreen, toggle } = useFullscreen()
const drawer = ref(false)
const form = reactive({
   oldPassword:'',
   password: '',
   repassword: '',
})
const formRef = ref(null)
const rules = {
   oldPassword: [
      {
         required: true,
         message: '旧密码不能为空',
         trigger: 'blur'
      }
   ],
   password: [
      {
         required: true,
         message: '新密码不能为空',
         trigger: 'blur'
      }
   ],
   repassword: [
      {
         required: true,
         message: '确认密码不能为空',
         trigger: 'blur'
      }
   ],
}
const loading = ref(false)
const notify = useNotification()

const handleCommand = (c) => {
   switch (c) {
      case "updatePassword":
         drawer.value = true
         break;
      case "logout":
         handleLogout()
         break;
      default:
         break;
   }
}

// 刷新事件
const handleRefresh = ()=> {
   location.reload()
}

// 提交密码修改
const submitUpdatePassword = ()=> {
   formRef.value.validate((valid) => {
      if (!valid) {
         return false
      }
      loading.value = true;
      updatePassword(form).then((res) => {
         notify.success("密码修改成功，请重新登录")
         store.logout()
         router.push("/login")
      }).finally(() => {
         loading.value = false;
         drawer.value = false;
      })
   })
}

// 注销事件
const handleLogout = (params)=> {
   useMessageBox().confirm("确认退出登录？").then(res => {
      logout().finally(() => {
         store.logout()
         router.push("/login")
         notify.success("退出登录成功")
      })
   })
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