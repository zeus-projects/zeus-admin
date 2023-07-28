<template>
   <Dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form v-loading="formLoading" label-width="auto" label-suffix=":" v-model="formData">
         <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" />
         </el-form-item>
         <el-form-item label="上级部门" prop="parentId">
            <el-tree-select
               :data="deptTree"
               placeholder="请选择上级部门"
               :render-after-expand="false"
               node-key="id"
               :props="props"
               highlight-current="true"
               accordion="true"
               @node-click="checkedNode()"
            />
         </el-form-item>
         <el-form-item label="部门状态" prop="status">
            <el-select placeholder="请选择部门状态">
               <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item label="排序" prop="sort">
            <el-input type="number" placeholder="请输入排序" />
         </el-form-item>
      </el-form>
      <template #footer>
         <el-button type="primary" @click="submit()">确定</el-button>
         <el-button @click="dialogVisible = false">关闭</el-button>
      </template>
   </Dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog } from '@/components/Dialog'
import {
   ElForm,
   ElFormItem,
   ElInput,
   ElButton,
   ElSelect,
   ElOption,
   ElTreeSelect
} from 'element-plus'
import { CommonStatusEnum } from '@/constants/common'
import * as DeptApi from '@/api/admin/dept'
import { statusOptions } from './dept.data'

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formLoading = ref(false)
const formType = ref('')
const formData = ref({
   id: undefined,
   name: undefined,
   parentId: undefined,
   sort: undefined,
   status: CommonStatusEnum.ENABLE
})
const deptTree = ref()
const props = {
   label: 'name',
   children: 'children'
}
const checkedNode = (current, node, treeNode, event) => {
   console.log(event)
}

const open = async (type: string, row: any) => {
   dialogVisible.value = true
   dialogTitle.value = type
   formType.value = type
   // 初始化表单枚举值
   init()
   // 编辑
   if (type === 'edit') {
      formData.value = row
   } else {
      formData.value = {
         id: undefined,
         name: undefined,
         parentId: undefined,
         sort: undefined,
         status: CommonStatusEnum.ENABLE
      }
   }
}
defineExpose({ open })

const init = async () => {
   deptTree.value = []
   const data = await DeptApi.tree()
   deptTree.value = data.data
   console.log(data.data)
}

const submit = () => {
   dialogVisible.value = false
}
</script>
