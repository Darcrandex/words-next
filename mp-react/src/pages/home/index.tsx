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
import BottomTabNavs, { BAR_HEIGHT, BAR_RADIUS } from '@/containers/BottomTabNavs'
import SectionTitle from '@/components/SectionTitle'
import { useSafeArea } from '@/stores/use-safe-area'
import { useUser } from '@/stores/use-user'
import { apiGetBanners, Banner } from '@/apis/common'
import { apiGetCategories, Category } from '@/apis/category'
import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'
import { mergeClassNames } from '@/utils'

import iconLike from '@/assets/icons/icon-like.svg'
import iconLikeActive from '@/assets/icons/icon-like-active.svg'
import iconCollect from '@/assets/icons/icon-collect.svg'
import iconCollectActive from '@/assets/icons/icon-collect-active.svg'
import iconShare from '@/assets/icons/icon-share.svg'
import iconShareActive from '@/assets/icons/icon-share-active.svg'
import Icon from '@/components/Icon'

export const HEADER_BOTTOM = 8

const Home: React.FC = () => {
  const { loginOnLaunch } = useUser()
  useMount(loginOnLaunch)

  // 布局相关
  const { safeArea } = useSafeArea()
  const headerTop = useMemo(() => safeArea.menuBtnRect.top + safeArea.menuBtnRect.height ?? 44, [safeArea])
  const scrollHeight = useMemo(
    () => safeArea.screenHeight - headerTop - BAR_HEIGHT - HEADER_BOTTOM - safeArea.safeAreaBottom + BAR_RADIUS,
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
        setParagraph({
          list: res.list.map(v => ({ ...v, liked: Math.random() > 0.2, collected: Math.random() > 0.2, shared: true })),
          total: res.total
        })
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
          shouldFixed && 'shadow-m'
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
        <Swiper autoplay className='h-36'>
          {banners.map(v => (
            <SwiperItem key={v.id}>
              <div className='relative mx-4'>
                <div
                  className='relative z-2 h-32 rounded-lg overflow-hidden bg-center bg-cover'
                  style={{ backgroundImage: `url('${v.imageUrl}')` }}
                />
                <div
                  className='absolute left-0 right-0 bottom-0 z-1 h-10 bg-bottom bg-cover rounded-b-lg opacity-30'
                  style={{ backgroundImage: `url('${v.imageUrl}')`, transform: 'translateY(25%) scale(0.9)' }}
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
                  className='rounded-full bg-blue-50 bg-cover bg-center shadow-m'
                  style={{ paddingTop: '100%', backgroundImage: `url("${v.cover}")` }}
                />
              </div>
              <p className='mt-2 text-xs text-gray-500 text-center'>{v.name}</p>
            </div>
          ))}
        </section>

        <SectionTitle>希望你喜欢</SectionTitle>

        {paragraphState.list.map(v => (
          <article
            key={v._id}
            className='m-4 mb-8 rounded-lg overflow-hidden shadow-m bg-white'
            onClick={e => {
              e.stopPropagation()
              Taro.navigateTo({ url: `/pages/paragraph-detail/index?id=${v._id}` })
            }}
          >
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

            <section className='flex justify-around'>
              <AuthWrapper className='flex items-center py-4'>
                <Icon url={v.liked ? iconLikeActive : iconLike} size={18} />
                <span className='w-6 ml-1 text-xs text-gray-500 text-center'>100</span>
              </AuthWrapper>
              <AuthWrapper className='flex items-center py-4'>
                <Icon url={v.collected ? iconCollectActive : iconCollect} size={18} />
                <span className='w-6 ml-1 text-xs text-gray-500 text-center'>45</span>
              </AuthWrapper>
              <AuthWrapper className='flex items-center py-4'>
                <Icon url={v.shared ? iconShareActive : iconShare} size={18} />
                <span className='w-6 ml-1 text-xs text-gray-500 text-center'>1</span>
              </AuthWrapper>
            </section>
          </article>
        ))}

        <div style={{ paddingBottom: BAR_RADIUS }}></div>
      </ScrollView>

      <BottomTabNavs />
    </>
  )
}

export default Home
