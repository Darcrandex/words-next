import { http } from '@/utils/http'
import { UserModel } from './user'

export interface CommentModel {
  _id: string
  content: string
  from: UserModel
  to?: UserModel
  createdAt?: string
}

export function apiGetComments(params: { paragraphId: string; commentId?: string; page?: number; size?: number }) {
  return http.get<{ list: CommentModel[]; total: number }>('/comment/list', params)
}

export function apiComment(data: {
  paragraphId: string
  content: string
  from: string
  commentId?: string
  to?: string
}) {
  return http.post('/comment/create', data)
}
