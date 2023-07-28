import request from '@/config/axios'

type SysDept = {
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

export const tree = (parentId?: any): Promise<IResponse> => {
   return request.get({
      url: '/admin/dept/tree',
      params: parentId
   })
}

export const page = (params: any): Promise<IResponse<Page<SysDept[]>>> => {
   return request.get({
      url: '/admin/dept/page',
      params
   })
}

export const save = (data: SysDept): Promise<IResponse<number>> => {
   return request.post({
      url: '/admin/dept',
      data
   })
}

export const update = (data: SysDept): Promise<IResponse> => {
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
