<script setup lang="ts">
import { reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
// import { Dialog } from '@/components/Dialog'
import { Table } from '@/components/Table'
// import { ElButton } from 'element-plus'
import { pageTenantPlanApi, delTenantPlanApi } from '@/api/admin/tenant'
import { TenantPlan } from '@/api/admin/tenant/types'
import { useI18n } from '@/hooks/web/useI18n'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { statusFormatter } from '@/hooks/web/useFormatter'
import { useTable } from '@/hooks/web/useTable'

const { t } = useI18n()
const { register, tableObject, methods } = useTable<TenantPlan>({
   getListApi: pageTenantPlanApi,
   delListApi: delTenantPlanApi,
   response: {
      list: 'list',
      total: 'total'
   },
   defaultParams: {
      title: ''
   }
})
const { getList, setSearchParams } = methods
getList()

const tenantPlanSchema = reactive<CrudSchema[]>([
   {
      field: 'id',
      label: t('tenantPlan.id'),
      type: 'index'
   },
   {
      field: 'name',
      label: t('tenantPlan.name'),
      search: {
         show: true
      }
   },
   {
      field: 'status',
      label: t('tenantPlan.status'),
      formatter: statusFormatter
   },
   {
      field: 'menuIds',
      label: t('tenantPlan.menuIds')
   }
])
const { allSchemas } = useCrudSchemas(tenantPlanSchema)
</script>

<template>
   <ContentWrap title="租户套餐">
      <Search
         :schema="allSchemas.searchSchema"
         @search="setSearchParams"
         @reset="setSearchParams"
      />
      <Table
         v-model:pageSize="tableObject.pageSize"
         v-model:currentPage="tableObject.currentPage"
         :columns="allSchemas.tableColumns"
         :data="tableObject.tableList"
         :loading="tableObject.loading"
         :pagination="{
            total: tableObject.total
         }"
         @register="register"
      >
         <!-- <template #action="{ row }">
            <ElButton
               type="primary"
               v-permission="['example:dialog:edit']"
               @click="action(row, 'edit')"
            >
               {{ t('exampleDemo.edit') }}
            </ElButton>
            <ElButton
               type="success"
               v-permission="['example:dialog:view']"
               @click="action(row, 'detail')"
            >
               {{ t('exampleDemo.detail') }}
            </ElButton>
            <ElButton
               type="danger"
               v-permission="['example:dialog:delete']"
               @click="delData(row, false)"
            >
               {{ t('exampleDemo.del') }}
            </ElButton>
         </template> -->
      </Table>
   </ContentWrap>

   <!-- <Dialog v-model="dialogVisible" :title="dialogTitle">
      <Write
         v-if="actionType !== 'detail'"
         ref="writeRef"
         :form-schema="allSchemas.formSchema"
         :current-row="tableObject.currentRow"
      />

      <Detail
         v-if="actionType === 'detail'"
         :detail-schema="allSchemas.detailSchema"
         :current-row="tableObject.currentRow"
      />

      <template #footer>
         <ElButton v-if="actionType !== 'detail'" type="primary" :loading="loading" @click="save">
            {{ t('exampleDemo.save') }}
         </ElButton>
         <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
      </template>
   </Dialog> -->
</template>
