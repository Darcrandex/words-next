/**
 * @name Resource
 * @description 作品详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useMount } from 'ahooks'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { apiGetResource, ResourceModel } from '@/apis/resource'
import { navigateToPage } from '@/utils'

const Resource: React.FC = () => {
  const resourceId = Taro.getCurrentInstance().router?.params.id || ''

  const [resource, setResource] = useState<ResourceModel>()
  const [list, setList] = useState<ParagraphModel[]>([])
  useMount(async () => {
    const res = await apiGetResource(resourceId)
    const paragraphRes = await apiGetParagraphs({ resource: resourceId })
    setResource(res)
    setList(paragraphRes.list)
  })

  return (
    <>
      <h1>{resource?.name}</h1>

      <p>句子列表</p>
      <ul>
        {list.map(v => (
          <li key={v._id} onClick={() => navigateToPage('paragraph', { id: v._id })}>
            <p>{v.content}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Resource
