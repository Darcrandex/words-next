import { randomStr } from '@/utils'

export type Banner = { id: string; link: string; imageUrl: string }

export async function apiGetBanners(): Promise<Banner[]> {
  return [
    {
      id: randomStr(),
      link: '',
      imageUrl: 'http://p1.music.126.net/QC3g4qlVuKXg9PRl0hYwjQ==/109951167032529896.jpg?imageView&quality=89'
    },
    {
      id: randomStr(),
      link: '',
      imageUrl: 'http://p1.music.126.net/m7ByCqWv8_Yj7Rg7GUJ9kg==/109951167033046111.jpg?imageView&quality=89'
    },
    {
      id: randomStr(),
      link: '',
      imageUrl: 'http://p1.music.126.net/X4NUuAyrmWWfGetv8OOm6A==/109951167033058315.jpg?imageView&quality=89'
    }
  ]
}
