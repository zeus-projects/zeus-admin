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
          <el-button round type="primary" @click="onSubmit" class="w-[250px]" color="#626aef" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, h } from 'vue'
import { useRouter } from 'vue-router';
import { notifySuccess, notifyError } from "@/util/notify";
import { useUserStore } from "@/store/user";

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
const loading = ref(false)
const router = useRouter();
const userStore = useUserStore()

const onSubmit = () => {
  formRef.value.validate((valid)=>{
    if (!valid) {
      notifyError('校验不通过，请检查输入！', 'error')
      return false;
    } else {
      loading.value = true;
      userStore.login(form)
      .then(()=>{
        notifySuccess('登录成功')
        router.push("/")
      })
      .finally(() => {
        loading.value = false;
      })
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

.right>div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>