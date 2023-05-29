<template>
  <el-row min class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>{{ brand }}</div>
        <div>{{ slogan }}</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">{{ title }}</h2>
      <div>
          <span class="line"></span>
          <span>账号密码登录</span>
          <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary" @click="onSubmit" class="w-[250px]" color="#626aef">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { login } from '@/api/auth.js'
import { useRouter } from 'vue-router';

const form = reactive({
  username: '',
  password: ''
})
const brand = "Zeus-Admin"
const slogan = "基于 vue3 + vite + windicss 构建的前端开发基础框架"
const title = "欢迎回来"

const rules = {
  username: [
    { 
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
}

const formRef = ref(null)

const router = useRouter();
const onSubmit = () => {
  formRef.value.validate((valid)=>{
    if (!valid) {
      ElNotification({
        title: 'Error',
        message: '校验不通过，请检查输入！',
        type: 'error',
      })
      return false;
    } else {
      // 发送登录请求
      login(form.username, form.password)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          // 1. 提示登录成功
          ElNotification({
            message: '登录成功！',
            type: 'success',
            duration: 1500
          })
          // 2. 存储 token 和用户信息
          // 3. 跳转到后台首页
          router.push("/")
        } else {
          ElNotification({
            message: response.data.msg,
            type: 'error',
            duration: 1500
          })
        }
      })
      .catch(function (error) {
        ElNotification({
          message: error.response.data.msg || "请求失败",
          type: 'error',
          duration: 1500
        })
      });
    }
  })
}
</script>

<style scoped>

.login-container {
  @apply min-h-screen bg-indigo-500;
}

.login-container .left, .login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right>div:first-child {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>