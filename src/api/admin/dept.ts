import request from '@/config/axios'

export type SysDept = {
  id: number
  name: string
  parentId: number
  level?: number
  sort?: number
  status?: number
  createBy?: string
  createTime?: Date
  updateBy?: string
  updateTime?: Date
  children?: SysDept[]
}

export const getDeptTree = (parentId?: any) => {
  return request.get({
    url: '/admin/dept/tree',
    params: parentId
  })
}

export const saveDept = (data: SysDept): Promise<IResponse<number>> => {
  return request.post({
    url: '/admin/dept',
    data
  })
}

export const updateById = (data: SysDept): Promise<IResponse> => {
  return request.put({
    url: '/admin/dept',
    data
  })
}

export const removeById = (id: number): Promise<IResponse> => {
  return request.delete({
    url: `/admin/dept/${id}`
  })
}

export const getById = (id: number): Promise<IResponse> => {
  return request.get({
    url: `/admin/dept/${id}`
  })
}
