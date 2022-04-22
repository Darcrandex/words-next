/**
 * @name ParagraphDetail
 * @description 详情页面
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import React, { useMemo, useState } from 'react'
import { useMount, useAsyncEffect } from 'ahooks'
import { apiGetParagraphById, Paragraph } from '@/apis/paragraph'
import { useSafeArea } from '@/stores/use-safe-area'

import Divider from '@/components/Divider'
import Tag from '@/components/Tag'
import SectionTitle from '@/components/SectionTitle'
import ScreenLoading from '@/components/ScreenLoading'

const ParagraphDetail: React.FC = () => {
  const id = useMemo(() => Taro.getCurrentInstance().router?.params.id ?? '', [])
  const { safeArea } = useSafeArea()
  const [data, setData] = useState<Paragraph>()
  const [coverHeight, setCoverHeight] = useState(300)

  useMount(async () => {
    const res = await apiGetParagraphById(id)
    setData(res)
  })

  useAsyncEffect(async () => {
    if (data?.cover) {
      const res = await Taro.getImageInfo({ src: data.cover })
      setCoverHeight((safeArea.screenWidth * res.height) / res.width)
    }
  }, [data])

  return (
    <>
      <Image className='w-full bg-gray-100' mode='aspectFill' src={data?.cover || ''} style={{ height: coverHeight }} />

      <section className='m-4 text-center leading-loose text-gray-600'>
        {data?.content.split('\n').map(str => (
          <p key={str}>{str}</p>
        ))}
      </section>

      <section className='m-4 text-center text-gray-400 text-sm'>
        {data?.resource.author.name}《{data?.resource.name || '一个神秘的作品'}》
      </section>

      <Divider className='m-4' />

      {data?.tags && data?.tags.length > 0 && (
        <section className='m-4'>
          <span className='inline-block py-1 text-xs text-gray-600'>#</span>
          {data?.tags.map(t => (
            <Tag key={t._id} className='ml-2'>
              {t.name}
            </Tag>
          ))}
        </section>
      )}

      <SectionTitle>议论纷纷</SectionTitle>

      <ScreenLoading loading={!data} />
    </>
  )
}

export default ParagraphDetail
