import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const { code } = config
const timeout = 1000
export default [
  {
    url: '/admin/role/page',
    method: 'get',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: {
            current: 1,
            size: 10,
            records: tableData,
            total: tableData.length
          }
        }
      }
    }
  },
  {
    url: '/admin/role',
    method: 'post',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: Mock.mock('@integer(13)'),
          message: 'ok'
        }
      }
    }
  },
  {
    url: '/admin/role',
    method: 'put',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: true,
          message: 'ok'
        }
      }
    }
  },
  {
    url: '/admin/role/:id',
    method: 'delete',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: true,
          message: 'ok'
        }
      }
    }
  }
] as MockMethod[]

const tableData = [
  {
    id: 1,
    name: '超级管理员',
    code: 'Role_SUPER_ADMIN',
    description:
      '超级管理员具有整个系统最高的权限，可以对系统的组织结构，用户账号，角色权限等等进行配置',
    dataScopeType: '1',
    dataScope: [],
    createBy: 'admin',
    updateBy: 'admin',
    createTime: '2022-03-31 17:03:15',
    updateTime: '2023-07-05 22:04:07'
  },
  {
    id: 2,
    name: '普通用户',
    code: 'Role_USER',
    description: '普通用户',
    dataScopeType: '0',
    dataScope: [1, 3, 4],
    createBy: 'admin',
    updateBy: 'admin',
    createTime: '2022-03-31 17:03:15',
    updateTime: '2023-07-05 22:04:07'
  }
]
