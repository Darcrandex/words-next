import http from '@/utils/http'

export interface TagGroup {
  _id: string
  name: string
}

export async function apiGetTagGroups(params?: {
  page?: number
  pageSize?: number
}): Promise<{ list: TagGroup[]; total: number }> {
  return await http.get('/tag-group/list', { params })
}

export async function apiCreateAuthor(payload: Omit<TagGroup, '_id'>): Promise<void> {
  return await http.post('/tag-group/create', payload)
}

export async function apiUpdaeteAuthor(payload: TagGroup): Promise<void> {
  const { _id, ...rest } = payload
  return await http.post(`/tag-group/update/${_id}`, rest)
}

export async function apiRemoveAuthor(id: string): Promise<void> {
  return await http.delete(`/tag-group/remove/${id}`)
}
