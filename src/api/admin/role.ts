import request from '@/config/axios'

export type SysRole = {
  id?: number
  name?: string
  code?: string
  description?: string
  dataScopeType?: string
  dataScope?: number[]
  createBy?: string
  createTime?: Date
  updateBy?: string
  updateTime?: Date
}

export const pageRoleApi = (page?: Page) => {
  return request.get({
    url: '/admin/Role/page',
    params: page
  })
}

export const saveRoleApi = (data: SysRole): Promise<IResponse<number>> => {
  return request.post({
    url: '/admin/Role',
    data
  })
}

export const updateRoleByIdApi = (data: SysRole): Promise<IResponse> => {
  return request.put({
    url: '/admin/Role',
    data
  })
}

export const removeRoleByIdApi = (id: number): Promise<IResponse> => {
  return request.delete({
    url: `/admin/Role/${id}`
  })
}

export const getRoleByIdApi = (id: number): Promise<IResponse> => {
  return request.get({
    url: `/admin/Role/${id}`
  })
}
