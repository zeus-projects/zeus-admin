import request from '@/config/axios'
import type { TenantPlan } from './types'

export const pageTenantPlanApi = (params: any): Promise<IResponse> => {
   return request.get({
      url: '/admin/tenant-plan/page',
      params
   })
}

export const saveTenantPlanApi = (data: Partial<TenantPlan>): Promise<IResponse> => {
   return request.post({
      url: '/admin/tenant-plan',
      data
   })
}

export const updateTenantPlanApi = (data: Partial<TenantPlan>): Promise<IResponse> => {
   return request.put({
      url: '/admin/tenant-plan',
      data
   })
}

export const getTenantPlanApi = (id: string): Promise<IResponse<TenantPlan>> => {
   return request.get({
      url: `/admin/tenant-plan/${id}`
   })
}

export const deleteTenantPlanApi = (id: string | number): Promise<IResponse> => {
   return request.delete({
      url: `/admin/tenant-plan/${id}`
   })
}
