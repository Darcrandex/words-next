/**
 * @name Home
 * @description
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, Image, SwiperItem, Swiper, ScrollViewProps, BaseEventOrig } from '@tarojs/components'
import { useMount } from 'ahooks'

import AuthWrapper from '@/containers/AuthWrapper'
import Icon from '@/components/Icon'
import BottomTabNavs, { BAR_HEIGHT, BAR_RADIUS } from '@/containers/BottomTabNavs'
import SectionTitle from '@/components/SectionTitle'
import ScreenLoading from '@/components/ScreenLoading'
import TopSearch, { useSearchBaSize } from '@/components/TopSearch'

import { useSafeArea } from '@/stores/use-safe-area'
import { useMarketParams } from '@/stores/use-market-params'
import { useUser } from '@/stores/use-user'
import { apiGetBanners, Banner } from '@/apis/common'
import { apiGetCategories, Category } from '@/apis/category'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { mergeClassNames, navigateToPage } from '@/utils'

import iconLike from '@/assets/icons/icon-like.svg'
import iconLikeActive from '@/assets/icons/icon-like-active.svg'
import iconCollect from '@/assets/icons/icon-collect.svg'
import iconCollectActive from '@/assets/icons/icon-collect-active.svg'
import iconShare from '@/assets/icons/icon-share.svg'
import iconShareActive from '@/assets/icons/icon-share-active.svg'

const Home: React.FC = () => {
  // 自动登录
  const { loginOnLaunch } = useUser()
  useMount(loginOnLaunch)

  // 布局相关
  const { safeArea } = useSafeArea()
  const { height: searchBarHeight } = useSearchBaSize()
  const scrollHeight = useMemo(
    () => safeArea.screenHeight - searchBarHeight - BAR_HEIGHT - safeArea.safeAreaBottom + BAR_RADIUS,
    [safeArea.safeAreaBottom, safeArea.screenHeight, searchBarHeight]
  )

  const [pageScrollTop, setScrollTop] = useState(0)
  const shouldFixed = useMemo(() => pageScrollTop > 2 * searchBarHeight, [searchBarHeight, pageScrollTop])
  const onScroll = useCallback(
    (event: BaseEventOrig<ScrollViewProps.onScrollDetail>) => setScrollTop(event.detail.scrollTop),
    []
  )

  // 数据请求
  const [banners, setBanners] = useState<Banner[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [query, setQuery] = useState({ page: 1 })
  const [list, setList] = useState<(ParagraphModel & { height: number })[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const onRefresherRefresh = useCallback(async () => {
    setLoading(true)

    try {
      // 轮播图片
      const bannerRes = await apiGetBanners()
      setBanners(bannerRes)

      // 分类（只要前4个）
      const categoryRes = await apiGetCategories()
      setCategories(categoryRes.list.slice(0, 4))

      // 句子列表
      const paragraphRes = await apiGetParagraphs()
      setList(paragraphRes.list.map(v => ({ ...v, height: ~~(Math.random() * 150) + 100 })))
      setTotal(paragraphRes.total)

      // 重置参数
      setQuery(currQuery => ({ ...currQuery, page: 1 }))
    } catch (error) {}

    setLoading(false)
  }, [])

  // 初始化自动刷新一次
  useMount(onRefresherRefresh)

  // 加载更多
  const onScrollToLower = useCallback(async () => {
    if (list.length < total) {
      setLoading(true)

      try {
        const nextQuery = { ...query, page: query.page + 1 }
        setQuery(nextQuery)

        const res = await apiGetParagraphs(nextQuery)
        setList(curr => curr.concat(...res.list.map(v => ({ ...v, height: ~~(Math.random() * 150) + 100 }))))
        setTotal(res.total)
      } catch (error) {}

      setLoading(false)
    }
  }, [list.length, total, query])

  const { setParams } = useMarketParams()
  const onCatetoyClick = (id: string) => {
    setParams({ categoryId: id })
    Taro.switchTab({ url: '/pages/market/index' })
  }

  return (
    <>
      <TopSearch className={mergeClassNames(shouldFixed && 'shadow-m')} onClick={() => navigateToPage('search-result')}>
        但愿人长久
      </TopSearch>

      <ScrollView
        scrollY
        style={{ height: scrollHeight }}
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
        onScroll={onScroll}
      >
        <Swiper autoplay className='h-36'>
          {banners.map(v => (
            <SwiperItem key={v.id}>
              <div className='relative mx-4'>
                <div
                  className='relative z-2 h-32 rounded overflow-hidden bg-center bg-cover'
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
            <div key={v._id} onClick={() => onCatetoyClick(v._id)}>
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

        {list.map(v => (
          <article
            key={v._id}
            className='m-4 mb-8 rounded overflow-hidden shadow-m bg-white'
            onClick={e => {
              e.stopPropagation()
              navigateToPage('paragraph', { id: v._id })
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

        <div style={{ height: BAR_RADIUS }}></div>
      </ScrollView>

      <BottomTabNavs />

      <ScreenLoading loading={loading} />
    </>
  )
}

export default Home
