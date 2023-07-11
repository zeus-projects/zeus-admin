<script setup lang="ts">
import { PropType } from 'vue'
import { TenantPlan } from '@/api/admin/tenant/types'
import { Descriptions } from '@/components/Descriptions'
import { ElTag } from 'element-plus'
import { DescriptionsSchema } from '@/types/descriptions'

defineProps({
   currentRow: {
      type: Object as PropType<Nullable<TenantPlan>>,
      default: () => null
   },
   detailSchema: {
      type: Array as PropType<DescriptionsSchema[]>,
      default: () => []
   }
})
</script>

<template>
   <Descriptions :schema="detailSchema" :data="currentRow || {}">
      <template #status="{ row }: { row: TenantPlan }">
         <ElTag :type="row.status === 0 ? 'success' : 'danger'">
            {{ row.status === 0 ? '启用' : '禁用' }}
         </ElTag>
      </template>

      <template #content="{ row }: { row: TenantPlan }">
         <div v-html="row.status"></div>
      </template>
   </Descriptions>
</template>
