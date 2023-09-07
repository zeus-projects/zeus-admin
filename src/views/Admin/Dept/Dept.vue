<template>
  <ContentWrap>
    <el-row shadow="hover" v-show="showSearch">
      <el-form :model="searchParam" :inline="true" @keyup.enter="search">
        <el-form-item prop="name" :label="$t('admin.dept.name')">
          <el-input
            v-model="searchParam.name"
            :placeholder="$t('admin.dept.nameTip')"
            style="max-width: 180px"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="useIcon({ icon: 'ep:search' })" @click="search">
            {{ $t('action.search') }}
          </el-button>
          <el-button :icon="useIcon({ icon: 'ep:refresh' })" @click="reset">
            {{ $t('action.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="mb-2">
      <el-button
        type="primary"
        :icon="useIcon({ icon: 'ep:folder-add' })"
        @click="formRef.open('add')"
      >
        {{ $t('action.add') }}
      </el-button>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      show-overflow-tooltip
    >
      <el-table-column :label="$t('admin.dept.name')" prop="name" />
      <el-table-column :label="$t('admin.dept.status')" prop="status" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="success"> {{ t('status.enable') }} </el-tag>
          <el-tag v-else type="danger"> {{ t('status.disable') }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('admin.dept.sortOrder')" prop="sortOrder" align="center" />
      <el-table-column :label="$t('table.action')" align="center">
        <template #default="{ row }">
          <el-button
            text
            type="primary"
            :icon="useIcon({ icon: 'ep:folder-add' })"
            @click="formRef.open('add', row)"
          >
            {{ $t('action.add') }}
          </el-button>
          <el-button
            text
            type="primary"
            :icon="useIcon({ icon: 'ep:edit-pen' })"
            @click="formRef.open('edit', row)"
          >
            {{ $t('action.edit') }}
          </el-button>
          <el-button
            text
            type="primary"
            :icon="useIcon({ icon: 'ep:delete' })"
            @click="handleDelete(row)"
          >
            {{ $t('action.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <DeptForm ref="formRef" @refresh="search" />
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
import { ref } from 'vue'
import { getDeptTreeApi, removeDeptByIdApi } from '@/api/admin/dept'
import { useTable } from '@/hooks/table/useTable'
import { useMessage, useMessageBox } from '@/hooks/web/useMessage'
import { useIcon } from '@/hooks/web/useIcon'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
const DeptForm = defineAsyncComponent(() => import('./DeptForm.vue'))

// props
const formRef = ref()
const showSearch = ref(true)
const { searchParam, loading, tableData, fetchData, search, reset } = useTable({
  fetchDataApi: getDeptTreeApi,
  isPage: false
})

// methods
const handleDelete = async (row: any) => {
  try {
    await useMessageBox().confirm(t('action.confirmDel'))
  } catch {
    return
  }
  try {
    await removeDeptByIdApi(row.id)
    fetchData()
    useMessage().success(t('message.delSuccess'))
  } catch (err: any) {
    useMessage().error(err.msg)
  }
}
</script>
