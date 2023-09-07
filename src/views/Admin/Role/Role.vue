<template>
  <ContentWrap>
    <!-- 搜索栏 -->
    <el-row shadow="hover">
      <el-form :model="searchParam" :inline="true" @keyup.enter="search">
        <el-form-item prop="name" :label="$t('admin.role.name')">
          <el-input
            :placeholder="$t('admin.role.name')"
            style="max-width: 180px"
            v-model="searchParam.name"
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

    <!-- 工具栏 -->
    <el-row class="mb-2">
      <el-button
        type="primary"
        :icon="useIcon({ icon: 'ep:folder-add' })"
        @click="formRef.open('add')"
      >
        {{ $t('action.add') }}
      </el-button>
    </el-row>

    <!-- 表格 -->
    <el-table border :data="tableData" v-loading="loading" row-key="id" show-overflow-tooltip>
      <el-table-column :label="$t('admin.role.name')" prop="name" :min-width="200" />
      <el-table-column
        :label="$t('admin.role.code')"
        prop="code"
        :min-width="200"
        :formatter="formatter"
      />
      <el-table-column :label="$t('admin.role.description')" prop="description" :min-width="200" />
      <el-table-column
        :label="$t('admin.role.dataScopeType')"
        prop="dataScopeType"
        :min-width="200"
        align="center"
      >
        <template #default="scope">
          <dict-tag :options="dictType" :value="scope.row.dataScopeType" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.createTime')"
        prop="createTime"
        :min-width="200"
        align="center"
      />
      <el-table-column :label="$t('table.action')" :width="300" align="center">
        <template #default="{ row }">
          <el-button
            text
            type="primary"
            :icon="useIcon({ icon: 'ep:edit-pen' })"
            @click="formRef.open('edit', row)"
          >
            {{ $t('action.edit') }}
          </el-button>

          <el-button text type="primary" :icon="useIcon({ icon: 'ep:expand' })">
            {{ $t('action.grant') }}
          </el-button>

          <el-popconfirm
            :title="$t('action.confirmDel')"
            :confirm-button-text="$t('action.confirm')"
            :cancel-button-text="$t('action.cancel')"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button text type="primary" :icon="useIcon({ icon: 'ep:delete' })">
                {{ $t('action.delete') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <RoleForm ref="formRef" />
  </ContentWrap>
</template>
<script setup lang="tsx">
import {
  ElTable,
  ElTableColumn,
  ElTag,
  ElForm,
  ElFormItem,
  ElRow,
  ElInput,
  ElButton,
  ElPopconfirm
} from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { DictTag } from '@/components/DictTag'
import { useTable } from '@/hooks/table/useTable'
import { useIcon } from '@/hooks/web/useIcon'
import { useMessage } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'
import { pageRoleApi, removeRoleByIdApi } from '@/api/admin/role'

const { t } = useI18n()

const RoleForm = defineAsyncComponent(() => import('./RoleForm.vue'))

const formRef = ref()
const { loading, tableData, searchParam, search, reset, fetchData } = useTable({
  fetchDataApi: pageRoleApi
})

const dictType = ref([
  {
    label: '全部',
    value: '0'
  },
  {
    label: '自定义',
    value: '1'
  },
  {
    label: '本部门及子部门',
    value: '2'
  },
  {
    label: '本部门',
    value: '3'
  },
  {
    label: '仅自己',
    value: '4'
  }
])

const formatter = (_row, _column, cellValue: string) => {
  return <ElTag>{cellValue}</ElTag>
}

const handleDelete = async (row: any) => {
  try {
    await removeRoleByIdApi(row.id)
    fetchData()
    useMessage().success(t('message.delSuccess'))
  } catch (err: any) {
    useMessage().error(t('message.delFailed'))
  }
}
</script>
