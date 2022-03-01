/**
 * @name Home
 * @description
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, Image, SwiperItem, Swiper, ScrollViewProps, BaseEventOrig } from '@tarojs/components'
import { useSetState, useMount } from 'ahooks'

import AuthWrapper from '@/containers/AuthWrapper'
import BottomTabNavs, { BAR_HEIGHT } from '@/containers/BottomTabNavs'
import SectionTitle from '@/components/SectionTitle'
import { useSafeArea } from '@/stores/use-safe-area'
import { apiGetBanners, Banner } from '@/apis/common'
import { apiGetCategories, Category } from '@/apis/category'
import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'
import { mergeClassNames, sleep } from '@/utils'

export const HEADER_BOTTOM = 8

const Home: React.FC = () => {
  // 布局相关
  const { safeArea } = useSafeArea()
  const headerTop = useMemo(() => safeArea.menuBtnRect.top + safeArea.menuBtnRect.height ?? 44, [safeArea])
  const scrollHeight = useMemo(
    () => safeArea.screenHeight - headerTop - BAR_HEIGHT - HEADER_BOTTOM - safeArea.safeAreaBottom,
    [headerTop, safeArea.safeAreaBottom, safeArea.screenHeight]
  )

  const [pageScrollTop, setScrollTop] = useState(0)
  const shouldFixed = useMemo(() => pageScrollTop > 2 * headerTop, [headerTop, pageScrollTop])
  const onScroll = useCallback(
    (event: BaseEventOrig<ScrollViewProps.onScrollDetail>) => setScrollTop(event.detail.scrollTop),
    []
  )

  // banner
  const [banners, setBanners] = useState<Banner[]>([])
  useMount(async () => {
    const arr = await apiGetBanners()
    setBanners(arr)
  })

  // 分类
  const [categories, setCategories] = useState<Category[]>([])
  useMount(async () => {
    const res = await apiGetCategories()
    setCategories(res.list.slice(0, 4))
  })

  // 主列表
  const [paragraphState, setParagraph] = useSetState<{ query: { page: number }; list: Paragraph[]; total: number }>({
    query: { page: 1 },
    list: [],
    total: 0
  })

  useMount(() => {
    apiGetParagraphs().then(res => setParagraph(res))
  })

  // 下拉刷新
  const [triggered, setTriggered] = useState(false)
  const onRefresherRefresh = useCallback(() => {
    setTriggered(true)
    setParagraph({ query: { page: 1 } })
    apiGetParagraphs()
      .then(res => {
        setParagraph({ list: res.list, total: res.total })
      })
      .finally(() => {
        setTriggered(false)
      })
  }, [setParagraph])

  // 加载更多
  const onScrollToLower = useCallback(() => {
    if (paragraphState.list.length < paragraphState.total) {
      apiGetParagraphs({ page: paragraphState.query.page + 1 }).then(res => {
        setParagraph(prev => ({
          query: { page: prev.query.page + 1 },
          list: prev.list.concat(res.list),
          total: res.total
        }))
      })
    }
  }, [paragraphState.list.length, paragraphState.query.page, paragraphState.total, setParagraph])

  return (
    <>
      <header
        className={mergeClassNames(
          'fixed top-0 left-0 right-0 z-10 flex items-end bg-white transition',
          shouldFixed && 'shadow-lg'
        )}
        style={{ height: headerTop, paddingBottom: HEADER_BOTTOM }}
      >
        <div style={{ width: safeArea.menuBtnRect.left, height: safeArea.menuBtnRect.height }}>
          <p className='bg-gray-100 mx-4 px-4 py-2 rounded-full text-xs text-gray-400 box-border'>但愿人长久</p>
        </div>
      </header>
      <div style={{ height: headerTop + HEADER_BOTTOM }} />

      <ScrollView
        scrollY
        style={{ height: scrollHeight }}
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={triggered}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
        onScroll={onScroll}
      >
        <Swiper autoplay indicatorColor='#aaa' indicatorActiveColor='#555' indicatorDots className='h-40'>
          {banners.map(v => (
            <SwiperItem key={v.id}>
              <div className='relative mx-4'>
                <div
                  className='relative z-2 h-32 rounded-lg overflow-hidden bg-center bg-cover'
                  style={{ backgroundImage: `url('${v.imageUrl}')` }}
                />
                <div
                  className='absolute left-0 right-0 bottom-0 z-1 h-10 bg-bottom bg-cover rounded-b-lg filter blur'
                  style={{ backgroundImage: `url('${v.imageUrl}')`, transform: 'translateY(20%) scale(0.9)' }}
                />
              </div>
            </SwiperItem>
          ))}
        </Swiper>

        <section className='grid grid-cols-4 m-4 mb-6'>
          {categories.map(v => (
            <div
              key={v._id}
              onClick={() => Taro.navigateTo({ url: `/pages/paragraph-center/index?category=${v._id}` })}
            >
              <div className='mx-4'>
                <div
                  className='rounded-full bg-blue-50 bg-cover bg-center shadow-md'
                  style={{ paddingTop: '100%', backgroundImage: `url("${v.cover}")` }}
                />
              </div>
              <p className='mt-2 text-xs text-gray-500 text-center'>{v.name}</p>
            </div>
          ))}
        </section>

        <SectionTitle>热门推荐</SectionTitle>

        {paragraphState.list.map(v => (
          <article key={v._id} className='m-4 mb-8 rounded-lg overflow-hidden shadow-lg bg-white'>
            <Image src={v.cover} mode='aspectFill' className='w-full h-40 bg-center bg-cover bg-blue-50' />

            <section className='m-4'>
              {v.content?.split('\n').map(str => (
                <p key={str} className='mb-1 last:mb-0 text-sm text-gray-600'>
                  {str}
                </p>
              ))}
            </section>

            <section className='mx-4 text-xs text-gray-400'>
              <span className='inline'>#&nbsp;</span>
              <span className='inline'>{v.resource?.author?.name ?? '佚名'}</span>
              {!!v.resource?.name && <span className='inline ml-1'>《{v.resource?.name}》</span>}
            </section>

            <section className='grid grid-cols-3'>
              <AuthWrapper className='flex items-center p-4'>
                <i className='iconfont icon-collection text-lg text-center text-gray-400'></i>
                <span className='ml-1 text-xs text-gray-400'>0</span>
              </AuthWrapper>
              <AuthWrapper className='flex items-center justify-center p-4'>
                <i className='iconfont icon-sound-filling-fill text-lg text-center text-gray-400'></i>
                <span className='ml-1 text-xs text-gray-400'>45</span>
              </AuthWrapper>
              <AuthWrapper className='flex items-center justify-end p-4'>
                <i className='iconfont icon-quick text-lg text-center text-gray-400'></i>
                <span className='ml-1 text-xs text-gray-400'>10K+</span>
              </AuthWrapper>
            </section>
          </article>
        ))}

        <div className='pt-1'></div>
      </ScrollView>

      <BottomTabNavs />
    </>
  )
}

export default Home
