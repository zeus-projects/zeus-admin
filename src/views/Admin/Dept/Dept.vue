<template>
  <ContentWrap>
    <el-row shadow="hover" v-show="showSearch">
      <el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
        <el-form-item prop="deptName" :label="$t('admin.dept.name')">
          <el-input
            :placeholder="$t('admin.dept.name')"
            style="max-width: 180px"
            v-model="state.queryForm.deptName"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="queryButton" @click="getDataList" />
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="mb-2">
      <el-button type="primary" :icon="addButton" @click="formRef.open('add')">
        {{ $t('table.add') }}
      </el-button>
    </el-row>
    <el-table
      :data="state.dataList"
      v-loading="state.loading"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
    >
      <el-table-column :label="$t('admin.dept.name')" prop="name" />
      <el-table-column :label="$t('admin.dept.status')" prop="status">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('admin.dept.sort')" prop="sort" />
      <el-table-column :label="$t('table.action')" show-overflow-tooltip>
        <template #default="scope">
          <el-button
            text
            type="primary"
            :icon="addButton"
            @click="formRef.open('add', scope.row?.id)"
          >
            {{ $t('table.action.add') }}
          </el-button>
          <el-button
            text
            type="primary"
            :icon="editButton"
            @click="formRef.open('edit', scope.row?.id)"
          >
            {{ $t('table.action.edit') }}
          </el-button>
          <el-button text type="primary" :icon="deleteButton" @click="handleDelete(scope.row)">
            {{ $t('table.action.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <DeptForm ref="formRef" />
  </ContentWrap>
</template>

<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import {
  ElButton,
  ElInput,
  ElRow,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElTag
} from 'element-plus'
import { ref, reactive } from 'vue'
import { getDeptTree, removeById } from '@/api/admin/dept'
import { useTable, TableProp } from '@/hooks/table/useTable'
import { useIcon } from '@/hooks/web/useIcon'
import { useMessage, useMessageBox } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
const DeptForm = defineAsyncComponent(() => import('./form.vue'))

const state: TableProp = reactive<TableProp>({
  dataList: [],
  queryForm: {
    deptName: ''
  },
  pagination: {
    enable: false
  },
  getDataApi: getDeptTree,
  loading: false
})
const { getDataList } = useTable(state)
const formRef = ref()
const showSearch = ref(true)

const queryButton = useIcon({ icon: 'ep:search' })
const addButton = useIcon({ icon: 'ep:folder-add' })
const editButton = useIcon({ icon: 'ep:edit-pen' })
const deleteButton = useIcon({ icon: 'ep:delete' })

// 删除当前行
const handleDelete = async (row: any) => {
  try {
    await useMessageBox().confirm(t('form.confirm'))
  } catch {
    return
  }
  try {
    await removeById(row.id)
    getDataList()
    useMessage().success(t('message.delSuccess'))
  } catch (err: any) {
    useMessage().error(err.msg)
  }
}
</script>
