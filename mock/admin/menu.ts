import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const { code } = config
const timeout = 1000

export default [
  {
    url: '/admin/menu/tree',
    method: 'get',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: tableData,
          message: ''
        }
      }
    }
  },
  {
    url: '/admin/menu',
    method: 'post',
    timeout,
    response: () => {
      return {
        data: {
          code: code,
          data: Mock.mock('@integer(13)'),
          message: ''
        }
      }
    }
  },
  {
    url: '/admin/menu/:id',
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
    name: '系统管理',
    parentId: 0,
    sortOrder: 1,
    icon: 'ep:home-filled',
    type: 'menu',
    path: '/admin',
    permission: [],
    children: [
      {
        id: 2,
        name: '部门管理',
        parentId: 1,
        sortOrder: 1,
        icon: 'mingcute:government-line',
        type: 'menu',
        path: '/admin/dept',
        permission: [],
        children: [
          {
            id: 21,
            name: '部门新增',
            parentId: 2,
            sortOrder: 1,
            type: 'button',
            permission: []
          },
          {
            id: 22,
            name: '部门修改',
            parentId: 2,
            sortOrder: 2,
            type: 'button',
            permission: []
          },
          {
            id: 23,
            name: '部门删除',
            parentId: 2,
            sortOrder: 3,
            type: 'button',
            permission: []
          }
        ]
      },
      {
        id: 3,
        name: '菜单管理',
        parentId: 1,
        sortOrder: 2,
        icon: 'ep:menu',
        type: 'menu',
        path: '/admin/menu',
        permission: [],
        children: [
          {
            id: 31,
            name: '菜单新增',
            parentId: 3,
            sortOrder: 1,
            type: 'button',
            permission: []
          },
          {
            id: 32,
            name: '菜单修改',
            parentId: 3,
            sortOrder: 2,
            type: 'button',
            permission: []
          },
          {
            id: 33,
            name: '菜单删除',
            parentId: 3,
            sortOrder: 3,
            type: 'button',
            permission: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: '模型管理',
    parentId: 0,
    sortOrder: 2,
    icon: 'carbon:model-alt',
    type: 'menu',
    path: '/lowcode',
    permission: []
  }
]
