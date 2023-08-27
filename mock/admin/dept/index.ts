import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { findNode } from '@/utils/tree'
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
          data: tableData,
          message: ''
        }
      }
    }
  },
  {
    url: '/admin/dept/:id',
    method: 'get',
    timeout,
    response: ({ url }) => {
      const pattern = /\/admin\/dept\/(\d+)/
      const matchResult = url.match(pattern)
      const id = parseInt(matchResult[1])
      return {
        data: {
          code: code,
          data: getById(id),
          message: 'ok'
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
        data: {
          code: code,
          data: Mock.mock('@integer(13)'),
          message: ''
        }
      }
    }
  },
  {
    url: '/admin/dept/:id',
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

const getById = (id) => {
  const node = findNode(
    tableData,
    (node) => {
      return node.id === id
    },
    {
      id: 'id',
      children: 'children',
      pid: 'parentId'
    }
  )
  return node
}

const tableData = [
  {
    id: 1,
    name: '平台部',
    parentId: 0,
    level: 1,
    sortOrder: 1,
    status: 0,
    children: [
      {
        id: 3,
        name: '平台开发部',
        parentId: 1,
        level: 2,
        sortOrder: 3,
        status: 0
      },
      {
        id: 4,
        name: '平台测试部',
        parentId: 1,
        level: 2,
        sortOrder: 4,
        status: 0
      }
    ]
  },
  {
    id: 2,
    name: '营销部',
    parentId: 0,
    level: 1,
    sortOrder: 2,
    status: 0,
    children: [
      {
        id: 5,
        name: '营销1部',
        parentId: 2,
        level: 2,
        sortOrder: 5,
        status: 0
      },
      {
        id: 6,
        name: '营销2部',
        parentId: 2,
        level: 2,
        sortOrder: 6,
        status: 1
      }
    ]
  }
]
