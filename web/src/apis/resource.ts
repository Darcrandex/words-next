import http from '@/utils/http'
import { Author } from './author'

export interface Resource {
  _id: string
  name: string
  category: string
  author: Author
  description: string
}

export interface ResourceForm {
  _id: string
  name: string
  category: string
  author: string
  description: string
}

export function generateResource(): ResourceForm {
  return { _id: '', name: '', category: '', author: '', description: '' }
}

export async function apiGetResource(params?: {
  page?: number
  pageSize?: number
}): Promise<{ list: Resource[]; total: number }> {
  return await http.get('/resource/list', { params })
}

export async function apiCreateResource(payload: Omit<ResourceForm, '_id'>): Promise<void> {
  return await http.post('/resource/create', payload)
}

export async function apiUpdaeteResource(payload: ResourceForm): Promise<void> {
  const { _id, ...rest } = payload
  return await http.post(`/resource/update/${_id}`, rest)
}

export async function apiRemoveResource(id: string): Promise<void> {
  return await http.delete(`/resource/remove/${id}`)
}
