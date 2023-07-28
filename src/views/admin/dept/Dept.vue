<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import {
   ElTable,
   ElTableColumn,
   ElForm,
   ElFormItem,
   ElInput,
   ElButton,
   ElSelect,
   ElOption,
   ElPopconfirm
} from 'element-plus'
import { statusFormatter } from '@/hooks/web/useFormatter'
import { ref, reactive } from 'vue'
import { statusOptions } from './dept.data'
import * as deptApi from '@/api/admin/dept'
import DeptForm from './DeptForm.vue'

// 搜索表单
const searchFormRef = ref()
const searchParams = reactive({
   name: '',
   status: '',
   size: 10,
   current: 1
})

const handleSearch = () => {
   console.log('search, params:' + JSON.stringify(searchParams))
   getTableData()
}
const restSearch = () => {
   console.log('restSearch')
   searchFormRef.value.resetFields()
   getTableData()
}

// 表格
const tableLoading = ref(true)
const tableRef = ref()
const tableData = ref([])

const getTableData = async () => {
   tableLoading.value = true
   try {
      const res = await deptApi.tree(searchParams)
      tableData.value = res.data
   } finally {
      tableLoading.value = false
   }
}
getTableData()

// 表单
const formRef = ref()

const handleAdd = () => {
   formRef.value.open('add')
}

const handleEdit = (row: any) => {
   formRef.value.open('edit', row)
   console.log(row)
}

const handleDelete = (id: number) => {
   console.log(id)
}
</script>

<template>
   <ContentWrap class="mb-15px">
      <el-form
         :model="searchParams"
         ref="searchFormRef"
         :inline="true"
         label-width="68px"
         class="-mb-5px"
      >
         <el-form-item label="部门名称" prop="name">
            <el-input
               v-model="searchParams.name"
               placeholder="请输入部门名称"
               clearable
               class="!w-240px"
            />
         </el-form-item>
         <el-form-item label="部门状态" prop="status">
            <el-select v-model="searchParams.status" class="!w-240px" placeholder="请选择部门状态">
               <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button @click="handleSearch" type="primary">
               <Icon icon="ep:search" class="mr-5px" /> 搜索
            </el-button>
            <el-button @click="restSearch">
               <Icon icon="ep:refresh" class="mr-5px" /> 重置
            </el-button>
         </el-form-item>
      </el-form>
   </ContentWrap>
   <ContentWrap class="pb-4">
      <el-button type="primary" class="mb-4" @click="handleAdd()">
         <Icon icon="ep:plus" class="mr-5px" />
         新增
      </el-button>
      <el-table
         :data="tableData"
         v-loading="tableLoading"
         row-key="id"
         ref="tableRef"
         border
         default-expand-all
      >
         <el-table-column prop="name" label="部门名称" sortable resizable />
         <el-table-column prop="status" label="状态" :formatter="statusFormatter" />
         <el-table-column prop="sort" label="排序" sortable resizable />
         <el-table-column label="操作">
            <template #default="scope">
               <el-button size="default" @click="handleEdit(scope.row)">编辑</el-button>
               <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  icon-color="#626AEF"
                  title="确定删除吗?"
                  @confirm="handleDelete(scope.row.id)"
               >
                  <template #reference>
                     <el-button size="default" type="danger">删除</el-button>
                  </template>
               </el-popconfirm>
            </template>
         </el-table-column>
      </el-table>
   </ContentWrap>

   <DeptForm ref="formRef" />
</template>
