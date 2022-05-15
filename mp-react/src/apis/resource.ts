import { http } from '@/utils/http'

export interface ResourceModel {
  _id: string
  name: string
  description: string
  cover?: string
}

export async function apiGetResources(params?: { page?: number; size?: number; author?: string; category?: string }) {
  return http.get<{ list: ResourceModel[]; total: number }>('/resource/list', params)
}

export async function apiGetResource(id: string) {
  return http.get<ResourceModel>(`/resource/detail/${id}`)
}
