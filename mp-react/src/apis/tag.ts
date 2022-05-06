import { http } from '@/utils/http'

export type Tag = { _id: string; name: string; group: { _id: string; name: string } }

export async function apiGetTagGroups() {
  return http.get<{ list: Tag[] }>('/tag-group/list')
}

export async function apiGetTags() {
  return http.get<{ list: Tag[] }>('/tag/list')
}

export async function apiGetTagById(id: string) {
  return http.get<Tag>(`/tag/detail/${id}`)
}
