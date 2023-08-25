import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { tableData } from './data'
import Mock from 'mockjs'

const { code } = config
const timeout = 1000
export default [
  {
    url: '/admin/dept/tree',
    method: 'get',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: tableData
        }
      }
    }
  },
  {
    url: '/admin/dept',
    method: 'post',
    timeout,
    response: () => {
      return {
        code: code,
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
        code: code,
        data: true
      }
    }
  }
] as MockMethod[]
