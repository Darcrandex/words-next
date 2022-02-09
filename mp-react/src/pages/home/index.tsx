/**
 * @name Home
 * @description
 * @author darcrand
 */

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'

const banners = [
  'https://th.wallhaven.cc/small/z8/z8dg9y.jpg',
  'https://th.wallhaven.cc/small/8o/8oky1j.jpg',
  'https://th.wallhaven.cc/small/e7/e7ek7k.jpg'
]

const Home: React.FC = () => {
  const [list, setList] = useState<Paragraph[]>([])

  useEffect(() => {
    apiGetParagraphs().then(res => setList(res))
  }, [])

  return (
    <>
      <p className='mx-4 mb-4 bg-gray-100 px-4 py-1 rounded-full text-xs text-gray-400'>但愿人长久</p>

      <Swiper indicatorColor='#999' indicatorActiveColor='#333' indicatorDots className='my-4 h-30'>
        {banners.map(v => (
          <SwiperItem key={v}>
            <div className='mx-4 h-30 bg-center bg-cover rounded-lg' style={{ backgroundImage: `url("${v}")` }}></div>
          </SwiperItem>
        ))}
      </Swiper>

      {list.map(v => (
        <article key={v._id} className='m-4 mb-8 rounded-lg overflow-hidden shadow-lg'>
          <section className='h-40 bg-center bg-cover' style={{ backgroundImage: `url("${v.cover}")` }}></section>

          <section className='m-4'>
            {v.content?.split('\n').map(str => (
              <p key={str} className='mb-1 last:mb-0 text-sm text-gray-600'>
                {str}
              </p>
            ))}
          </section>

          <section className='mx-4 text-xs text-gray-400'>#&nbsp;{v.resource}</section>

          <section className='grid grid-cols-3'>
            <div className='flex items-center p-4'>
              <i className='iconfont icon-collection text-lg text-center text-gray-400'></i>
              <span className='ml-1 text-xs text-gray-400'>0</span>
            </div>
            <div className='flex items-center justify-center p-4'>
              <i className='iconfont icon-sound-filling-fill text-lg text-center text-gray-400'></i>
              <span className='ml-1 text-xs text-gray-400'>45</span>
            </div>
            <div className='flex items-center justify-end p-4'>
              <i className='iconfont icon-quick text-lg text-center text-gray-400'></i>
              <span className='ml-1 text-xs text-gray-400'>10K+</span>
            </div>
          </section>
        </article>
      ))}
    </>
  )
}

export default Home
