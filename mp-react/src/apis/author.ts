import { http } from '@/utils/http'

export interface AuthorModel {
  _id: string
  name: string
  description: string
}

export async function apiGetAuthors(params?: { page?: number; size?: number }) {
  return http.get<{ list: AuthorModel[]; total: number }>('/author/list', params)
}

export async function apiGetAuthor(id: string) {
  return http.get<AuthorModel>(`/author/detail/${id}`)
}
