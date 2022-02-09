import http from '@/utils/http'

export interface Author {
  _id: string
  name: string
  description?: string
}

export async function apiGetAuthors(params?: {
  page?: number
  pageSize?: number
}): Promise<{ list: Author[]; total: number }> {
  return await http.get('/author/list', { params })
}

export async function apiCreateAuthor(payload: Omit<Author, '_id'>): Promise<void> {
  return await http.post('/author/create', payload)
}

export async function apiUpdaeteAuthor(payload: Author): Promise<void> {
  const { _id, ...rest } = payload
  return await http.post(`/author/update/${_id}`, rest)
}

export async function apiRemoveAuthor(id: string): Promise<void> {
  return await http.delete(`/author/remove/${id}`)
}
