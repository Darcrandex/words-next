import { http } from '@/utils/http'

export interface Catogory {
  _id: string
  name: string
  cover?: string
  description?: string
}

export async function apiGetCategories() {
  return http.get<{ list: Catogory[]; total: number }>('/category/list')
}
