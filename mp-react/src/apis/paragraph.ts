import { http } from '@/utils/http'

export interface Paragraph {
  _id: string
  content: string
  cover: string
  resource: { name: string; author: { name: string }; category: { name: string } }
}

export async function apiGetParagraphs(params?: { page?: number; pageSize?: number }) {
  return await http.get<{ list: Paragraph[]; total: number }>('/paragraph/list', params)
}
