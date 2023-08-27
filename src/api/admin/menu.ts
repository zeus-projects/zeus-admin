import request from '@/config/axios'

export type SysMenu = {
  id: number
  name: string
  parentId: number
  level?: number
  sortOrder?: number
  status?: number
  icon?: string
  path?: string
  type: string
  permission?: string[]
  createBy?: string
  createTime?: Date
  updateBy?: string
  updateTime?: Date
  children?: SysMenu[]
}

export const getMenuTreeApi = (parentId?: any) => {
  return request.get({
    url: '/admin/menu/tree',
    params: parentId
  })
}

export const saveMenuApi = (data: SysMenu): Promise<IResponse<number>> => {
  return request.post({
    url: '/admin/menu',
    data
  })
}

export const updateMenuByIdApi = (data: SysMenu): Promise<IResponse> => {
  return request.put({
    url: '/admin/menu',
    data
  })
}

export const removeMenuByIdApi = (id: number): Promise<IResponse> => {
  return request.delete({
    url: `/admin/menu/${id}`
  })
}

export const getMenuByIdApi = (id: number): Promise<IResponse> => {
  return request.get({
    url: `/admin/menu/${id}`
  })
}
