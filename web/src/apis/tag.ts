import http from '@/utils/http'

export interface Tag {
  _id: string
  name: string
  group: string
}

export async function apiGetTags(params?: {
  page?: number
  pageSize?: number
}): Promise<{ list: Tag[]; total: number }> {
  return await http.get('/tag/list', { params })
}

export async function apiCreateTag(payload: Omit<Tag, '_id'>): Promise<void> {
  return await http.post('/tag/create', payload)
}

export async function apiUpdaeteTag(payload: Tag): Promise<void> {
  const { _id, ...rest } = payload
  return await http.post(`/tag/update/${_id}`, rest)
}

export async function apiRemoveTag(id: string): Promise<void> {
  return await http.delete(`/tag/remove/${id}`)
}
