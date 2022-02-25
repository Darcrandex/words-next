/**
 * @name ParagraphCenter
 * @description
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import React, { useMemo, useState } from 'react'
import { useSetState, useAsyncEffect } from 'ahooks'
import { apiGetParagraphs, Paragraph, ListFetchQuery } from '@/apis/paragraph'
import { apiGetTags, Tag } from '@/apis/tag'

const ParagraphCenter: React.FC = () => {
  // 路由参数
  const params = useMemo(() => Taro.getCurrentInstance().router?.params, [])
  const [query, setQuery] = useSetState<ListFetchQuery>({
    page: parseInt(params?.page || '1'),
    pageSize: parseInt(params?.pageSize || '10'),
    category: params?.category,
    tag: params?.tag,
    resource: params?.resource
  })

  const [list, setList] = useState<Paragraph[]>([])
  const [total, setTotal] = useState<number>(0)

  useAsyncEffect(async () => {
    const res = await apiGetParagraphs(query)
    setList(res.list)
    setTotal(res.total)
  }, [query])

  return (
    <>
      <h1>ParagraphCenter</h1>
      <p className='wrap'>{JSON.stringify(query)}</p>
    </>
  )
}

export default ParagraphCenter
