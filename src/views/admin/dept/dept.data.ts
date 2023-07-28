import { SysDept } from '@/types/admin/dept'

export const tableData: SysDept[] = [
   {
      id: 1,
      name: '平台部',
      parentId: 0,
      level: 1,
      sort: 1,
      status: 0,
      children: [
         {
            id: 3,
            name: '平台开发部',
            parentId: 1,
            level: 2,
            sort: 3,
            status: 0
         },
         {
            id: 4,
            name: '平台测试部',
            parentId: 1,
            level: 2,
            sort: 4,
            status: 0
         }
      ]
   },
   {
      id: 2,
      name: '营销部',
      parentId: 0,
      level: 1,
      sort: 2,
      status: 0,
      children: [
         {
            id: 3,
            name: '营销部',
            parentId: 1,
            level: 2,
            sort: 5,
            status: 0
         },
         {
            id: 4,
            name: '营销部',
            parentId: 1,
            level: 2,
            sort: 6,
            status: 0
         }
      ]
   }
]

export const statusOptions = [
   {
      label: '启用',
      value: 0
   },
   {
      label: '禁用',
      value: 1
   }
]
