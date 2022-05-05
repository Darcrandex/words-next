/**
 * @name ParagraphDetail
 * @description 详情页面
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { Image, ScrollView } from '@tarojs/components'
import React, { useMemo, useState } from 'react'
import { useMount, useAsyncEffect } from 'ahooks'
import { apiGetParagraphById, Paragraph } from '@/apis/paragraph'
import { useSafeArea } from '@/stores/use-safe-area'

import AuthWrapper from '@/containers/AuthWrapper'
import Icon from '@/components/Icon'
import Divider from '@/components/Divider'
import Tag from '@/components/Tag'
import SectionTitle from '@/components/SectionTitle'
import ScreenLoading from '@/components/ScreenLoading'
import TopHeader, { HEADER_BOTTOM } from '@/components/TopHeader'

import iconLike from '@/assets/icons/icon-like.svg'
import iconLikeActive from '@/assets/icons/icon-like-active.svg'
import iconCollect from '@/assets/icons/icon-collect.svg'
import iconCollectActive from '@/assets/icons/icon-collect-active.svg'
import iconShare from '@/assets/icons/icon-share.svg'
import iconShareActive from '@/assets/icons/icon-share-active.svg'

import Comments, { useCommentEffect } from './Comments'
import CommentBox, { PADDING_TOP, CONTENT_HEIGHT } from './CommentBox'

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

  const scrollHeight = useMemo(
    () =>
      safeArea.screenHeight -
      safeArea.menuBtnRect.top -
      safeArea.menuBtnRect.height -
      HEADER_BOTTOM -
      PADDING_TOP -
      CONTENT_HEIGHT -
      safeArea.safeAreaBottom,
    [safeArea.menuBtnRect.height, safeArea.menuBtnRect.top, safeArea.safeAreaBottom, safeArea.screenHeight]
  )

  const { list, total, refreshing, loading, onRefresherRefresh, onScrollToLower } = useCommentEffect({
    paragraphId: id
  })

  return (
    <>
      <TopHeader />

      <ScrollView
        scrollY
        scrollWithAnimation
        style={{ height: scrollHeight }}
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
      >
        <Image
          className='w-full bg-gray-100'
          mode='aspectFill'
          src={data?.cover || ''}
          style={{ height: coverHeight }}
        />

        <section className='m-4 text-center leading-loose text-gray-600'>
          {data?.content.split('\n').map(str => (
            <p key={str}>{str}</p>
          ))}
        </section>

        <section className='m-4 text-center text-gray-400 text-sm'>
          {data?.resource.author.name}《{data?.resource.name || '一个神秘的作品'}》
        </section>

        <Divider className='m-4' />

        {!!data?.description && <section className='m-4 text-sm text-gray-600 indent-2'>{data.description}</section>}

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

        <section className='flex justify-around'>
          <AuthWrapper className='flex items-center py-4'>
            <Icon url={data?.liked ? iconLikeActive : iconLike} size={18} />
            <span className='w-6 ml-1 text-xs text-gray-500 text-center'>100</span>
          </AuthWrapper>
          <AuthWrapper className='flex items-center py-4'>
            <Icon url={data?.collected ? iconCollectActive : iconCollect} size={18} />
            <span className='w-6 ml-1 text-xs text-gray-500 text-center'>45</span>
          </AuthWrapper>
          <AuthWrapper className='flex items-center py-4'>
            <Icon url={data?.shared ? iconShareActive : iconShare} size={18} />
            <span className='w-6 ml-1 text-xs text-gray-500 text-center'>1</span>
          </AuthWrapper>
        </section>

        <SectionTitle>议论纷纷</SectionTitle>
        <Comments paragraphId={id} list={list} total={total} />

        <div style={{ height: PADDING_TOP }}></div>
      </ScrollView>

      <CommentBox paragraphId={id} />

      <ScreenLoading loading={!data || refreshing || loading} />
    </>
  )
}

export default ParagraphDetail
