/**
 * @name ParagraphDetail
 * @description 详情页面
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import React, { useMemo, useState } from 'react'
import { apiGetParagraphById, Paragraph } from '@/apis/paragraph'
import { useMount } from 'ahooks'

const ParagraphDetail: React.FC = () => {
  const id = useMemo(() => Taro.getCurrentInstance().router?.params.id ?? '', [])
  const [data, setData] = useState<Paragraph>()

  useMount(async () => {
    const res = await apiGetParagraphById(id)
    setData(res)
  })

  return (
    <>
      <h1>ParagraphDetail</h1>
      <p>id:{id}</p>
    </>
  )
}

export default ParagraphDetail
