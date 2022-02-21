import { http } from '@/utils/http'

export interface Catogory {
  name: string
  cover?: string
  description?: string
}

export async function apiGetCategories() {
  return http.get<{ list: Catogory[]; total: number }>('/category/list')
}
