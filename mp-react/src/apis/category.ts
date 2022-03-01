import { http } from '@/utils/http'

export interface Category {
  _id: string
  name: string
  cover?: string
  description?: string
}

export async function apiGetCategories() {
  return http.get<{ list: Category[]; total: number }>('/category/list')
}
