import { http } from '@/utils/http'

export interface Paragraph {
  _id: string
  content: string
  cover: string
  resource: { name: string; author: { name: string }; category: { name: string } }
}

export type ListFetchQuery = {
  page?: number
  pageSize?: number
  category?: string // 分类单选
  tag?: string // 标签单选
  resource?: string // 出处
  keywords?: string
}

export async function apiGetParagraphs(params?: ListFetchQuery) {
  return await http.get<{ list: Paragraph[]; total: number }>('/paragraph/list', params)
}

export async function apiGetParagraphById(id: string) {
  return await http.get<Paragraph>(`/paragraph/detail/${id}`)
}
