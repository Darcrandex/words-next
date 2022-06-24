import { http } from '@/utils/http'

export type TagGroupModel = { _id: string; name: string }
export type TagModel = { _id: string; name: string; group: TagGroupModel }

export async function apiGetTagGroups() {
  return http.get<{ list: TagModel[] }>('/tag-group/list')
}

export async function apiGetTags() {
  return http.get<{ list: TagModel[] }>('/tag/list')
}

export async function apiGetTagById(id: string) {
  return http.get<TagModel>(`/tag/detail/${id}`)
}
