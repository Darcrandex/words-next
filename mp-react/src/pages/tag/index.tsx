/**
 * @name WithTag
 * @description 打标签的句子列表
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import TopHeader from '@/components/TopHeader'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { navigateToPage } from '@/utils'

const WithTag: React.FC = () => {
  const tagId = useMemo(() => Taro.getCurrentInstance().router?.params.id ?? '', [])
  const [list, setList] = useState<ParagraphModel[]>([])
  const [total, setTotal] = useState(0)

  useAsyncEffect(async () => {
    const res = await apiGetParagraphs({ tag: tagId })
    setList(res.list)
    setTotal(res.total)
  }, [tagId])

  return (
    <>
      <TopHeader>高兴的句子 {tagId}</TopHeader>

      {list.map(v => (
        <p key={v._id} onClick={() => navigateToPage('paragraph', { id: v._id })}>
          {v.content}
        </p>
      ))}
    </>
  )
}

export default WithTag
