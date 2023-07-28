import { MockMethod } from 'vite-plugin-mock'
import { tableData } from './data'
import Mock from 'mockjs'

const result_code = '0000'
const timeout = 1000
export default [
   {
      url: '/admin/dept/tree',
      method: 'get',
      timeout,
      response: () => {
         return {
            code: result_code,
            data: tableData
         }
      }
   },
   {
      url: '/admin/dept',
      method: 'post',
      timeout,
      response: () => {
         return {
            code: result_code,
            data: Mock.mock('@integer(13)')
         }
      }
   },
   {
      url: '/admin/dept/{id}',
      method: 'delete',
      timeout,
      response: () => {
         return {
            code: result_code,
            data: true
         }
      }
   }
] as MockMethod[]
