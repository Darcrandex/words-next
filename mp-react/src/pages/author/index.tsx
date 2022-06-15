/**
 * @name Author
 * @description 作者详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { useMount } from 'ahooks'
import { apiGetAuthor, AuthorModel } from '@/apis/author'
import { apiGetResources, ResourceModel } from '@/apis/resource'
import { navigateToPage } from '@/utils'
import Avatar from '@/components/Avatar'
import TopHeader from '@/components/TopHeader'
import SectionTitle from '@/components/SectionTitle'
import Divider from '@/components/Divider'

const Author: React.FC = () => {
  const authorId = Taro.getCurrentInstance().router?.params.id || ''

  const [author, setAuthor] = useState<AuthorModel>()
  const [list, setList] = useState<ResourceModel[]>([])

  useMount(async () => {
    const res = await apiGetAuthor(authorId)
    setAuthor(res)
    const resourceRes = await apiGetResources({ author: authorId })
    setList(resourceRes.list)
  })

  return (
    <>
      <TopHeader fixed>{author?.name}</TopHeader>
      <Avatar className='mx-auto my-4 w-24 h-24 rounded-full shadow-m' />

      <div className='m-4 p-2 indent-2 tracking-wide text-sm text-gray-800 bg-gray-50 rounded-md'>
        {author?.description && author.description.length > 0 ? (
          author.description.split('\n').map(str => (
            <p key={str} className='mb-2'>
              {str}
            </p>
          ))
        ) : (
          <p>这个创作者并没有任何的描述。(￣ー￣*|||</p>
        )}
      </div>

      <SectionTitle>作品列表</SectionTitle>

      {list.map(v => (
        <React.Fragment key={v._id}>
          <section className='flex m-4' onClick={() => navigateToPage('resource', { id: v._id })}>
            <div
              className='shrink-0 w-16 h-20 rounded-md shadow-m bg-gray-100 bg-center bg-cover'
              style={{
                backgroundImage: `url('${v.cover || 'https://img.shuicaimi.com/2020/12/%E5%9B%BE%E7%89%87-5.png'}')`
              }}
            ></div>

            <div className='flex-1 mx-4'>
              <h3 className='mb-2 text-gray-800 font-bold'>{v.name}</h3>
              <div className='relative h-10 overflow-hidden text-gray-600 text-sm'>
                <p className='absolute top-0 left-0 w-full h-full'>{v.description || '嗯。。。好像啥也没有留下。'}</p>
              </div>
            </div>
          </section>

          <Divider className='mx-4' />
        </React.Fragment>
      ))}
    </>
  )
}

export default Author
