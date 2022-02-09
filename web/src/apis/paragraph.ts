import http from '@/utils/http'
import { Tag } from './tag'

export interface Paragraph {
  _id: string
  content: string
  resource: { _id: string; name: string }
  description?: string
  tags?: Tag[]
  cover?: string
}

export interface ParagraphForm {
  _id: string
  content: string
  resource: string
  description?: string
  tags?: string[]
  cover?: string
}

export function generateParagraph(): ParagraphForm {
  return { _id: '', content: '', resource: '', description: '', cover: '', tags: [] }
}

export async function apiGetParagraphs(params?: {
  page?: number
  pageSize?: number
}): Promise<{ list: Paragraph[]; total: number }> {
  return await http.get('/paragraph/list', { params })
}

export async function apiCreateParagraph(payload: Omit<ParagraphForm, '_id'>): Promise<void> {
  return await http.post('/paragraph/create', payload)
}

export async function apiUpdaeteParagraph(payload: ParagraphForm): Promise<void> {
  const { _id, ...rest } = payload
  return await http.post(`/paragraph/update/${_id}`, rest)
}

export async function apiRemoveParagraph(id: string): Promise<void> {
  return await http.delete(`/paragraph/remove/${id}`)
}
