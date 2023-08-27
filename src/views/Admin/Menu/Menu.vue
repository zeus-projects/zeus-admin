<template>
  <ContentWrap>
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
        <el-form-item prop="type" :label="$t('admin.menu.type')">
          <el-input
            :placeholder="$t('admin.menu.type')"
            style="max-width: 180px"
            v-model="searchParam.type"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="useIcon({ icon: 'ep:search' })" @click="search">
            {{ $t('table.action.search') }}
          </el-button>
          <el-button type="primary" :icon="useIcon({ icon: 'ep:refresh' })" @click="reset">
            {{ $t('table.action.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
    >
      <el-table-column :label="$t('admin.menu.name')" prop="name" />
      <el-table-column :label="$t('admin.menu.sortOrder')" prop="sortOrder" show-overflow-tooltip />
      <el-table-column :label="$t('admin.menu.icon')" prop="icon" show-overflow-tooltip>
        <template #default="scope">
          <Icon v-if="scope.row.icon" :icon="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('admin.menu.path')" prop="path" show-overflow-tooltip />
      <el-table-column :label="$t('admin.menu.type')" prop="type" show-overflow-tooltip>
        <template #default="scope">
          <el-tag :type="scope.row.type == 'menu' ? '' : 'success'"> {{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('admin.menu.permission')"
        prop="permission"
        show-overflow-tooltip
      />
      <el-table-column :label="$t('table.column.action')" show-overflow-tooltip />
    </el-table>
  </ContentWrap>
</template>

<script setup>
import {
  ElTable,
  ElTableColumn,
  ElTag,
  ElForm,
  ElFormItem,
  ElRow,
  ElInput,
  ElButton
} from 'element-plus'
import { ref, reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useTable } from '@/hooks/table/useTable'
import { useIcon } from '@/hooks/web/useIcon'
import { getMenuTreeApi } from '@/api/admin/menu'
import { rest } from 'lodash-es'

const searchRef = ref()
const { loading, tableData, searchParam, search, reset } = useTable({
  fetchDataApi: getMenuTreeApi,
  isPage: false
})
</script>
