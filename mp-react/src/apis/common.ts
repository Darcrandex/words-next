import { http } from '@/utils/http'

export type Banner = { id: string; link: string; imageUrl: string }

export async function apiGetBanners(): Promise<Banner[]> {
  return http.get('/paragraph/top-banners')
}
