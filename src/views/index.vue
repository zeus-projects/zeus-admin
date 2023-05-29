<template>
  <div>
    <el-button type="primary" @click="addCount">count: {{ count }}</el-button>
    <el-button type="primary" @click="addcount2">form.count: {{ form.count }}</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

let count = ref(0);
function addCount() {
  count.value++;
}

const form = reactive({
  count: 0
})

function  addcount2() {
  form.count++;
}
</script>