/**
 * @name Home
 * @description
 * @author darcrand
 */

import React, { useState, useEffect } from 'react'
import { usePageScroll, usePullDownRefresh, stopPullDownRefresh, useReachBottom } from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'
import { useMount, useSetState } from 'ahooks'

import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'
import { mergeClassNames } from '@/utils'

import { useUser } from '@/stores/use-user'
import AuthWrapper from '@/containers/AuthWrapper'
import { apiGetCategories, Catogory } from '@/apis/category'

const banners = [
  'http://p1.music.126.net/QC3g4qlVuKXg9PRl0hYwjQ==/109951167032529896.jpg?imageView&quality=89',
  'http://p1.music.126.net/m7ByCqWv8_Yj7Rg7GUJ9kg==/109951167033046111.jpg?imageView&quality=89',
  'http://p1.music.126.net/X4NUuAyrmWWfGetv8OOm6A==/109951167033058315.jpg?imageView&quality=89'
]

const Home: React.FC = () => {
  // 登陆
  const { loginOnLaunch } = useUser()
  useMount(() => {
    loginOnLaunch()
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

  usePullDownRefresh(() => {
    setParagraph({ query: { page: 1 } })
    apiGetParagraphs().then(res => {
      setParagraph(res)
      stopPullDownRefresh()
    })
  })

  useReachBottom(() => {
    if (paragraphState.list.length < paragraphState.total) {
      apiGetParagraphs({ page: paragraphState.query.page + 1 }).then(res => {
        setParagraph(prev => ({
          query: { page: prev.query.page + 1 },
          list: prev.list.concat(res.list),
          total: res.total
        }))
      })
    }
  })

  // 分类
  const [categories, setCategories] = useState<Catogory[]>([])
  useEffect(() => {
    apiGetCategories().then(res => setCategories(res.list))
  }, [])

  // 头部搜索框
  const [visibleHeader, setVisible] = useState(true)
  const [, setScrollTop] = useState(0)
  usePageScroll(({ scrollTop }) => {
    setScrollTop(prev => {
      // 往上滑-隐藏，往下滑-显示
      setVisible(scrollTop < 300 || prev > scrollTop)
      return scrollTop
    })
  })

  return (
    <>
      <section
        className={mergeClassNames(
          'sticky top-0 left-0 z-10 bg-white px-4 pb-2 transition',
          visibleHeader ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <p className='bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-400'>但愿人长久</p>
      </section>

      <Swiper autoplay indicatorColor='#aaa' indicatorActiveColor='#555' indicatorDots className='h-40'>
        {banners.map(v => (
          <SwiperItem key={v}>
            <div
              className='relative z-2 mx-4 h-35 bg-center bg-cover rounded-lg'
              style={{ backgroundImage: `url("${v}")` }}
            ></div>
            <div
              className='relative mx-8 h-2 bg-bottom bg-cover rounded-b-lg filter blur'
              style={{ backgroundImage: `url("${v}")`, transform: 'translateY(-50%)' }}
            ></div>
          </SwiperItem>
        ))}
      </Swiper>

      <section className='grid grid-cols-4 m-4 mb-6'>
        {categories.slice(0, 4).map(v => (
          <div key={v.name}>
            <div className='mx-4'>
              <div
                className='rounded-full bg-blue-50 bg-cover bg-center shadow-md'
                style={{ paddingTop: '100%', backgroundImage: `url("${v.cover}")` }}
              ></div>
            </div>
            <p className='mt-2 text-xs text-gray-500 text-center'>{v.name}</p>
          </div>
        ))}
      </section>

      <h3 className='flex items-center m-4'>
        <i className='w-1 h-4 bg-red-400 mr-1 rounded-tr rounded-bl'></i>
        <span className='text-gray-800'>热门推荐</span>
      </h3>

      {paragraphState.list.map(v => (
        <article key={v._id} className='m-4 mb-8 rounded-lg overflow-hidden shadow-lg'>
          <section
            className='h-40 bg-center bg-cover bg-gray-100'
            style={{ backgroundImage: `url("${v.cover}")` }}
          ></section>

          <section className='m-4'>
            {v.content?.split('\n').map(str => (
              <p key={str} className='mb-1 last:mb-0 text-sm text-gray-600'>
                {str}
              </p>
            ))}
          </section>

          <section className='mx-4 text-xs text-gray-400'>
            <span className='inline'>#&nbsp;</span>
            {!!v.resource?.author?.name && <span className='inline'>{v.resource?.author?.name}</span>}
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
    </>
  )
}

export default Home
