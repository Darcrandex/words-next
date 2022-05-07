/**
 * @name Author
 * @description 作者详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useMount } from 'ahooks'
import { apiGetAuthor, AuthorModel } from '@/apis/author'
import { apiGetResources, ResourceModel } from '@/apis/resource'
import { navigateToPage } from '@/utils'

const Author: React.FC = () => {
  const authorId = Taro.getCurrentInstance().router?.params.id || ''

  const [author, setAuthor] = useState<AuthorModel>()
  const [list, setList] = useState<ResourceModel[]>([])

  useMount(async () => {
    const res = await apiGetAuthor(authorId)
    setAuthor(res)
    const resourceRes = await apiGetResources({ author: authorId })
    setList(resourceRes.list)
  })

  return (
    <>
      <h1>Author :{author?.name}</h1>

      <p>作品列表</p>
      <ul>
        {list.map(v => (
          <li key={v._id} onClick={() => navigateToPage('resource', { id: v._id })}>
            {v.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Author
