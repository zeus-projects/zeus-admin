<template>
   <Dialog v-model="dialog.visible" :title="dialog.title">
      <el-form v-loading="dialog.loading" label-width="80px" v-model="formData">
         <el-row :gutter="12">
            <el-col :span="10">
               <el-form-item label="上级部门" prop="parentId">
                  <el-tree-select
                     placeholder="请选择上级部门"
                     v-model="formData.parentId"
                     :data="deptTree"
                     :props="props"
                     :render-after-expand="false"
                     node-key="id"
                     value-key="id"
                     label="name"
                     value="id"
                     show-checkbox
                  />
               </el-form-item>
            </el-col>
            <el-col :span="10">
               <el-form-item label="部门状态" prop="status">
                  <el-select placeholder="请选择部门状态" v-model="formData.status">
                     <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                     />
                  </el-select>
               </el-form-item>
            </el-col>
         </el-row>
         <el-form-item label="部门名称" prop="name" width="80px">
            <el-input placeholder="请输入部门名称" v-model="formData.name" width="80px" />
         </el-form-item>
         <el-form-item label="排序" prop="sort">
            <el-input type="number" placeholder="请输入排序" v-model="formData.sort" />
         </el-form-item>
      </el-form>
      <template #footer>
         <el-button type="primary" @click="submit()">确定</el-button>
         <el-button @click="dialog.visible = false">关闭</el-button>
      </template>
   </Dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Dialog } from '@/components/Dialog'
import {
   ElForm,
   ElFormItem,
   ElRow,
   ElCol,
   ElInput,
   ElButton,
   ElSelect,
   ElOption,
   ElTreeSelect
} from 'element-plus'
import * as DeptApi from '@/api/admin/dept'
import { statusOptions } from './dept.data'

const dialog = reactive({
   visible: false,
   title: '',
   loading: false,
   type: ''
})

const formData = ref({
   id: undefined,
   name: undefined,
   parentId: undefined,
   sort: undefined,
   status: undefined
})
interface Department {
   id: number
   name: string
}
const deptTree = ref(Array<Department>())

const props = {
   label: 'name',
   children: 'children'
}
const open = async (type: string, row: any) => {
   dialog.visible = true
   dialog.type = type
   dialog.loading = true
   init()
   dialog.loading = false
   console.log('open')
   if (type === 'edit') {
      dialog.title = '编辑部门'
      formData.value = {
         id: row.id,
         name: row.name,
         parentId: row.parentId,
         sort: row.sort,
         status: row.status
      }
   } else if (type === 'add') {
      dialog.title = '新增部门'
   }
}
defineExpose({ open })

const init = async () => {
   const data = await DeptApi.tree()
   deptTree.value = data.data
   deptTree.value = [{ id: 0, name: '一级部门' }, ...data.data]
   console.log('inited')
}

const submit = () => {
   dialog.visible = false
   console.log(formData.value)
}
</script>
