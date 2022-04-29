import { http } from '@/utils/http'

export function apiGetComments(paragraphId: string, comment: string) {
  return http.post('/comment/list', { paragraphId, comment })
}
