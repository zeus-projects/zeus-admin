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
         menuIds: [1, 2, 3]
      },
      {
         id: 2,
         name: '普通租户',
         status: 0,
         menuIds: [1, 2, 3]
      },
      {
         id: 3,
         name: '高级租户',
         status: 1,
         menuIds: [1, 2, 3]
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
   },
   {
      url: '/admin/tenant-plan',
      method: 'post',
      timeout,
      response: ({ body }) => {
         const last = MOCK_TENANT_PLAN.list.length - 1
         const { id } = MOCK_TENANT_PLAN.list[last]
         body.id = id + 1
         MOCK_TENANT_PLAN.list.push(body)
         return {
            code: result_code,
            msg: '增加成功'
         }
      }
   },
   {
      url: '/admin/tenant-plan',
      method: 'put',
      timeout,
      response: ({ body }) => {
         MOCK_TENANT_PLAN.list = MOCK_TENANT_PLAN.list.map((item) => {
            if (body.id && item.id === parseInt(body.id)) {
               return body
            }
            return item
         })
         return {
            code: result_code,
            msg: '更新成功'
         }
      }
   },
   {
      url: '/admin/tenant-plan/(.+)',
      method: 'delete',
      timeout,
      response: ({ url }) => {
         const id = url.match(/\/admin\/tenant-plan\/(.+)/)[1]
         MOCK_TENANT_PLAN.list = MOCK_TENANT_PLAN.list.filter((item) => item.id !== parseInt(id))
         return {
            code: result_code,
            msg: '删除成功'
         }
      }
   }
] as MockMethod[]
