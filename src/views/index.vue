<template>
  <div class="flex items-center justify-center min-h-screen space-x-5">
    <el-button type="primary" @click="$alert(getToken)">显示 token</el-button>
    <router-link to="/login" @click="removeToken">
       <el-button type="primary">退出登录</el-button>
    </router-link>
  </div>
</template>

<script setup>
import { getToken, removeToken } from '@/util/auth'

</script>