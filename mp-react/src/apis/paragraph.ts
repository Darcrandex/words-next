import { http } from '@/utils/http'

export interface ParagraphModel {
  _id: string
  content: string
  cover: string
  resource: { name: string; author: { name: string }; category: { name: string } }
  description?: string
  tags: Array<{ _id: string; name: string }>
  liked?: boolean
  collected?: boolean
  shared?: boolean
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
  return await http.get<{ list: ParagraphModel[]; total: number }>('/paragraph/list', params)
}

export async function apiGetParagraphById(id: string) {
  return await http.get<ParagraphModel>(`/paragraph/detail/${id}`)
}

export async function apiLikeParagraph(id: string) {
  return await http.post(`/paragraph/like/${id}`)
}

export async function apiCollectParagraph(id: string) {
  return await http.post(`/paragraph/collect/${id}`)
}

export async function apiGetHotWords() {
  return await http.get<string[]>('/paragraph/hot-words')
}

export function apiGetWordsTips(keywords: string) {
  return http.get<string[]>('/paragraph/words-tips', { keywords })
}
