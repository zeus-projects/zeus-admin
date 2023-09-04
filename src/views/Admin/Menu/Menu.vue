<template>
  <ContentWrap>
    <!-- 搜索栏 -->
    <el-row shadow="hover">
      <el-form :model="searchParam" :inline="true" @keyup.enter="search">
        <el-form-item prop="name" :label="$t('admin.menu.name')">
          <el-input
            :placeholder="$t('admin.menu.name')"
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
    <el-table
      border
      :data="tableData"
      v-loading="loading"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :default-sort="{ prop: 'sortOrder', order: 'descending' }"
    >
      <el-table-column
        :label="$t('admin.menu.name')"
        prop="name"
        :min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('admin.menu.icon')"
        prop="icon"
        :min-width="50"
        show-overflow-tooltip
      >
        <template #default="scope">
          <Icon v-if="scope.row.icon" :icon="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('admin.menu.path')"
        prop="path"
        :min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('admin.menu.type')"
        prop="type"
        :min-width="50"
        show-overflow-tooltip
      >
        <template #default="scope">
          <el-tag :type="scope.row.type == 'menu' ? '' : 'success'">
            {{
              scope.row.type === 'menu' ? $t('admin.menu.menuType') : $t('admin.menu.buttonType')
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('admin.menu.permission')"
        prop="permission"
        :min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('admin.menu.sortOrder')"
        prop="sortOrder"
        :min-width="50"
        sortable
        show-overflow-tooltip
      />
      <el-table-column :label="$t('table.action')" :width="300" show-overflow-tooltip>
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
    <MenuForm ref="formRef" />
  </ContentWrap>
</template>

<script setup lang="ts">
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
import { useTable } from '@/hooks/table/useTable'
import { useIcon } from '@/hooks/web/useIcon'
import { getMenuTreeApi, removeMenuByIdApi } from '@/api/admin/menu'
import { useMessage } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const MenuForm = defineAsyncComponent(() => import('./MenuForm.vue'))
const formRef = ref()

const { loading, tableData, searchParam, search, reset, fetchData } = useTable({
  fetchDataApi: getMenuTreeApi,
  isPage: false
})

const handleDelete = async (row: any) => {
  try {
    await removeMenuByIdApi(row.id)
    fetchData()
    useMessage().success(t('message.delSuccess'))
  } catch (err: any) {
    useMessage().error(t('message.delFailed'))
  }
}
</script>
