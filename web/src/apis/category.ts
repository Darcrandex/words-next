import http from '@/utils/http'

export interface Category {
  _id: string
  name: string
}

export async function apiGetCategories(params?: {
  page?: number
  pageSize?: number
}): Promise<{ list: Category[]; total: number }> {
  return await http.get('/category/list', { params })
}

export async function apiCreateCategory(payload: Omit<Category, '_id'>): Promise<void> {
  return await http.post('/category/create', payload)
}

export async function apiUpdaeteCategory(payload: Category): Promise<void> {
  const { _id, ...rest } = payload
  return await http.post(`/category/update/${_id}`, rest)
}

export async function apiRemoveCategory(id: string): Promise<void> {
  return await http.delete(`/category/remove/${id}`)
}
