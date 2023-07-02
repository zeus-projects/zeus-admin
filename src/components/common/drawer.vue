<template>
   <el-drawer v-model="showDrawer" 
      :title="title" 
      :size="size" 
      :close-on-click-modal="false"
      :destroy-on-close="destroyeOnClose">
      <div class="formDrawer">
         <div class="body">
            <slot></slot>
         </div>
         <div class="actions">
            <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
            <el-button type="default" @click="close">取消</el-button>
         </div>
      </div>
   </el-drawer>
</template>

<script setup>
import { ref } from 'vue'

// 抽屉事件
const showDrawer = ref(false)
const open = ()=> showDrawer.value = true
const close = () => showDrawer.value = true
// 提交事件
const emit = defineEmits(["submit"])
const submit = () => emit("submit")
// loading
const loading = ref(false)
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

// 向父组件暴露属性
defineProps({
   title:String,
   size: {
      type:String,
      default: "45%"
   },
   destroyeOnClose: {
      type:Boolean,
      default: false
   },
   confirmText: {
      type: String,
      default: "确认"
   }
})
// 向父组件暴露方法
defineExpose({
   open,
   close,
   showLoading,
   hideLoading
})
</script>

<style lang="postcss">
.formDrawer {
   width: 100%;
   height: 100%;
   position: relative;
   @apply flex flex-col;
}

.formDrawer .body {
   flex:1;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 50px;
   overflow-y: auto;
}

.formDrawer .actions {
   height: 50px;
   @apply mt-auto flex items-center;
}

</style>