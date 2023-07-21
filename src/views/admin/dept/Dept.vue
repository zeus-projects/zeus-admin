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
   ElOption
} from 'element-plus'
import { statusFormatter } from '@/hooks/web/useFormatter'
import { ref, reactive } from 'vue'

interface SysDept {
   id: number
   name: string
   parentId: number
   level?: number
   sort?: number
   status?: number
   createBy?: string
   createTime?: Date
   updateBy?: string
   updateTime?: Date
   children?: SysDept[]
}

const tableData: SysDept[] = [
   {
      id: 1,
      name: '平台部',
      parentId: 0,
      level: 1,
      sort: 1,
      status: 0,
      children: [
         {
            id: 3,
            name: '平台开发部',
            parentId: 1,
            level: 2,
            sort: 3,
            status: 0
         },
         {
            id: 4,
            name: '平台测试部',
            parentId: 1,
            level: 2,
            sort: 4,
            status: 0
         }
      ]
   },
   {
      id: 2,
      name: '营销部',
      parentId: 0,
      level: 1,
      sort: 2,
      status: 0,
      children: [
         {
            id: 3,
            name: '营销部',
            parentId: 1,
            level: 2,
            sort: 5,
            status: 0
         },
         {
            id: 4,
            name: '营销部',
            parentId: 1,
            level: 2,
            sort: 6,
            status: 0
         }
      ]
   }
]

// 搜索表单
const searchFormRef = ref()
const searchParams = reactive({
   name: '',
   status: ''
})
const statusOptions = [
   {
      label: '启用',
      value: 0
   },
   {
      label: '禁用',
      value: 1
   }
]

const handleSearch = () => {
   console.log('search, params:' + JSON.stringify(searchParams))
}
const restSearch = () => {
   console.log('restSearch')
   searchFormRef.value.resetFields()
}
</script>

<template>
   <ContentWrap>
      <el-form
         :model="searchParams"
         ref="searchFormRef"
         :inline="true"
         label-width="68px"
         class="flex"
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
         <el-form-item class="justify-end">
            <el-button @click="handleSearch" type="primary">
               <Icon icon="ep:search" class="mr-5px" /> 搜索
            </el-button>
            <el-button @click="restSearch">
               <Icon icon="ep:refresh" class="mr-5px" /> 重置
            </el-button>
         </el-form-item>
      </el-form>
   </ContentWrap>

   <ContentWrap>
      <el-table
         :data="tableData"
         style="width: 100%; margin-bottom: 20px"
         row-key="id"
         border
         default-expand-all
      >
         <el-table-column prop="name" label="部门名称" sortable resizable />
         <el-table-column prop="status" label="状态" :formatter="statusFormatter" />
         <el-table-column prop="sort" label="排序" sortable resizable />
      </el-table>
   </ContentWrap>
</template>
