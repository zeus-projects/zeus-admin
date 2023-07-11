<script setup lang="ts">
import { ref, unref, reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Table } from '@/components/Table'
import { Dialog } from '@/components/Dialog'
import { ElButton } from 'element-plus'
import {
   pageTenantPlanApi,
   saveTenantPlanApi,
   updateTenantPlanApi,
   deleteTenantPlanApi
} from '@/api/admin/tenant'
import { TenantPlan } from '@/api/admin/tenant/types'
import { useI18n } from '@/hooks/web/useI18n'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { statusFormatter } from '@/hooks/web/useFormatter'
import { useTable } from '@/hooks/web/useTable'
import TenantPlanForm from './components/TenantPlanForm.vue'
import TenantPlanDetail from './components/TenantPlanDetail.vue'

// table config
const { t } = useI18n()
const tenantPlanSchema = reactive<CrudSchema[]>([
   {
      field: 'id',
      label: t('tenantPlan.id'),
      form: {
         show: false
      },
      detail: {
         show: false
      }
   },
   {
      field: 'name',
      label: t('tenantPlan.name'),
      search: {
         show: true
      },
      form: {
         colProps: { span: 24 }
      },
      detail: { span: 24 }
   },
   {
      field: 'menuIds',
      label: t('tenantPlan.menuIds'),
      table: {
         show: false
      },
      form: {
         hidden: true
      },
      detail: {
         show: true
      }
   },
   {
      field: 'status',
      label: t('tenantPlan.status'),
      form: {
         colProps: { span: 24 },
         component: 'Switch',
         value: 0,
         componentProps: {
            activeValue: 0,
            inactiveValue: 1
         }
      },
      formatter: statusFormatter
   },
   {
      field: 'action',
      width: '260px',
      label: t('table.action'),
      form: {
         show: false
      },
      detail: {
         show: false
      }
   }
])
const { allSchemas } = useCrudSchemas(tenantPlanSchema)

const { register, tableObject, methods } = useTable<TenantPlan>({
   getListApi: pageTenantPlanApi,
   delListApi: deleteTenantPlanApi,
   response: {
      list: 'list',
      total: 'total'
   }
})
const { getList, setSearchParams } = methods
getList()

// operation
const actionType = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('')
const loading = ref(false)
const formRef = ref<ComponentRef<typeof TenantPlanForm>>()
// add
const AddAction = () => {
   dialogTitle.value = t('table.add')
   tableObject.currentRow = null
   dialogVisible.value = true
   actionType.value = 'add'
}

const save = async () => {
   console.log('save tenant plan')
   console.log(actionType.value)
   const form = unref(formRef)
   await form?.elFormRef?.validate(async (isValid) => {
      if (isValid) {
         loading.value = true
         const data = (await form?.getFormData()) as TenantPlan
         console.log(data)
         const res = await saveTenantPlanApi(data)
            .catch(() => {})
            .finally(() => {
               loading.value = false
            })
         if (res) {
            dialogVisible.value = false
            tableObject.currentPage = 1
            getList()
         }
      }
   })
}

// update
const update = async () => {
   console.log('update tenant plan')
   const form = unref(formRef)
   await form?.elFormRef?.validate(async (isValid) => {
      if (isValid) {
         loading.value = true
         const data = (await form?.getFormData()) as TenantPlan
         const res = await updateTenantPlanApi(data)
            .catch(() => {})
            .finally(() => {
               loading.value = false
            })
         if (res) {
            dialogVisible.value = false
            tableObject.currentPage = 1
            getList()
         }
      }
   })
}

// delete
const deleteLoading = ref(false)
const handleDelete = async (row: TenantPlan | null, multiple: boolean) => {
   tableObject.currentRow = row
   const { delList, getSelections } = methods
   const selections = await getSelections()
   deleteLoading.value = true
   await delList(
      multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as number],
      multiple
   ).finally(() => {
      deleteLoading.value = false
   })
}

// dialog
const action = (row: TenantPlan, type: string) => {
   dialogTitle.value = t(type === 'edit' ? 'table.edit' : 'table.detail')
   actionType.value = type
   tableObject.currentRow = row
   dialogVisible.value = true
}
</script>

<template>
   <ContentWrap title="租户套餐">
      <Search
         :schema="allSchemas.searchSchema"
         @search="setSearchParams"
         @reset="setSearchParams"
      />

      <div class="mb-10px">
         <ElButton type="primary" @click="AddAction">{{ t('table.add') }}</ElButton>
         <ElButton :loading="deleteLoading" type="danger" @click="handleDelete(null, true)">
            {{ t('table.delete') }}
         </ElButton>
      </div>

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
         <template #action="{ row }">
            <ElButton type="primary" @click="action(row, 'edit')">
               {{ t('table.edit') }}
            </ElButton>
            <ElButton type="success" @click="action(row, 'detail')">
               {{ t('table.detail') }}
            </ElButton>
            <ElButton type="danger" @click="handleDelete(row, false)">
               {{ t('table.delete') }}
            </ElButton>
         </template>
      </Table>
   </ContentWrap>
   <!-- max-height="120px" width="800px"-->
   <Dialog v-model="dialogVisible" :title="dialogTitle">
      <TenantPlanForm
         v-if="actionType !== 'detail'"
         ref="formRef"
         :form-schema="allSchemas.formSchema"
         :current-row="tableObject.currentRow"
      />
      <TenantPlanDetail
         v-if="actionType === 'detail'"
         :detail-schema="allSchemas.detailSchema"
         :current-row="tableObject.currentRow"
      />
      <template #footer>
         <ElButton
            v-if="actionType !== 'detail'"
            type="primary"
            :loading="loading"
            @click="actionType == 'add' ? save() : update()"
         >
            {{ t('table.confirm') }}
         </ElButton>
         <ElButton @click="dialogVisible = false">{{ t('table.close') }}</ElButton>
      </template>
   </Dialog>
</template>
