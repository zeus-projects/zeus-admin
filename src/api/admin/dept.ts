import request from '@/config/axios'

export type SysDept = {
  id: number
  name: string
  parentId: number
  level?: number
  sortOrder?: number
  status?: number
  createBy?: string
  createTime?: Date
  updateBy?: string
  updateTime?: Date
  children?: SysDept[]
}

export const getDeptTreeApi = (parentId?: any) => {
  return request.get({
    url: '/admin/dept/tree',
    params: parentId
  })
}

export const saveDeptApi = (data: SysDept): Promise<IResponse<number>> => {
  return request.post({
    url: '/admin/dept',
    data
  })
}

export const updateDeptByIdApi = (data: SysDept): Promise<IResponse> => {
  return request.put({
    url: '/admin/dept',
    data
  })
}

export const removeDeptByIdApi = (id: number): Promise<IResponse> => {
  return request.delete({
    url: `/admin/dept/${id}`
  })
}

export const getDeptByIdApi = (id: number): Promise<IResponse> => {
  return request.get({
    url: `/admin/dept/${id}`
  })
}
