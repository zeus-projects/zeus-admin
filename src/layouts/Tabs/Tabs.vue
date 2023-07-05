<template>
   <div>
      <el-tabs
         v-model="editableTabsValue"
         type="card"
         editable
         class="demo-tabs"
         @edit="handleTabsEdit"
      >
         <el-tab-pane
         v-for="item in editableTabs"
         :key="item.name"
         :label="item.title"
         :name="item.name"
         >
         {{ item.content }}
         </el-tab-pane>
      </el-tabs>
   </div>
</template>
<script setup>
</script>