// import { http } from '@/utils/http'

export interface Paragraph {
  _id: string
  content: string
  cover: string
  resource: string
}

export async function apiGetList(params?: { page?: number; pageSize?: number }) {
  // return await http.get<{ data: { _id: string; content: string; total: number }[] }>('/paragraph/list', params)

  return [
    {
      _id: '01',
      cover:
        'https://media.npr.org/assets/img/2018/02/16/cocoguitars-0-1_wide-c516a3c53762d3ffc6764ff585163b959ac0058f-s800-c85.webp',
      content: '死亡不是生命的终点，遗忘才是。',
      resource: '《寻梦游记》'
    },
    {
      _id: '02',
      content: '斯人若彩虹，遇上方知有。',
      resource: '《怦然心动》',
      cover:
        'https://th.bing.com/th/id/R.f7f251e6ca8f9461f7475ad8baa5b3fe?rik=fUanLz0IzZ%2faPQ&riu=http%3a%2f%2fupload-images.jianshu.io%2fupload_images%2f4744920-fa8de9a4ec84af4b.jpg&ehk=nCyRUeEj3hMcxoZTd5PX8XjvglZ3PTQVeS5YIln%2foXo%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      _id: '03',
      content:
        "You got a dream, you gotta protect it. People can't do something themselves,they wanna tell you you can't do it.If you want something, go get it. \n如果你有梦想的话，就要去捍卫它。那些一事无成的人想告诉你你也成不了大器。如果你有理想的话，就要去努力实现。",
      resource: '《当幸福来敲门》',
      cover: 'https://th.bing.com/th/id/OIF.fM6RKAcYPA9vbjJ6IxOSDQ?pid=ImgDet&rs=1'
    },
    {
      _id: '0155',
      cover:
        'https://media.npr.org/assets/img/2018/02/16/cocoguitars-0-1_wide-c516a3c53762d3ffc6764ff585163b959ac0058f-s800-c85.webp',
      content: '死亡不是生命的终点，遗忘才是。',
      resource: '《寻梦游记》'
    },
    {
      _id: '0299',
      content: '斯人若彩虹，遇上方知有。',
      resource: '《怦然心动》',
      cover:
        'https://th.bing.com/th/id/R.f7f251e6ca8f9461f7475ad8baa5b3fe?rik=fUanLz0IzZ%2faPQ&riu=http%3a%2f%2fupload-images.jianshu.io%2fupload_images%2f4744920-fa8de9a4ec84af4b.jpg&ehk=nCyRUeEj3hMcxoZTd5PX8XjvglZ3PTQVeS5YIln%2foXo%3d&risl=&pid=ImgRaw&r=0'
    }
  ]
}
