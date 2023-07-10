import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const MOCK_TENANT_PLAN: Recordable = {
   list: [
      {
         id: 1,
         name: '默认租户',
         status: 0,
         menuIds: '[1,2,3]'
      },
      {
         id: 1,
         name: '普通租户',
         status: 0,
         menuIds: '[1]'
      },
      {
         id: 3,
         name: '高级租户',
         status: 1,
         menuIds: '[1,2,3,4,5,6]'
      }
   ]
}

export default [
   {
      url: '/admin/tenant-plan/page',
      method: 'get',
      timeout,
      response: () => {
         MOCK_TENANT_PLAN.total = MOCK_TENANT_PLAN.list.length
         return {
            code: result_code,
            data: MOCK_TENANT_PLAN
         }
      }
   }
] as MockMethod[]
