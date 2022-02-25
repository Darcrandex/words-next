/**
 * @name Category
 * @description 分类大全（tab）
 * @author darcrand
 */

import React, { useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import SectionTitle from '@/components/SectionTitle'

import { apiGetTags } from '@/apis/tag'
import Taro from '@tarojs/taro'

type TagGroup = {
  _id: string
  name: string
  children: {
    _id: string
    name: string
  }[]
}

const Category: React.FC = () => {
  const [tagGroups, setTagGroups] = useState<TagGroup[]>([])

  useAsyncEffect(async () => {
    const res = await apiGetTags()
    const groups = res.list.reduce((prev: TagGroup[], curr) => {
      const last = prev[prev.length - 1]
      if (last && last._id === curr.group._id) {
        last.children.push({ _id: curr._id, name: curr.name })
      } else {
        prev.push({ _id: curr.group._id, name: curr.group.name, children: [{ _id: curr._id, name: curr.name }] })
      }
      return prev
    }, [])
    setTagGroups(groups)
  }, [])

  return (
    <>
      <SectionTitle>精选</SectionTitle>
      <SectionTitle>分类</SectionTitle>

      {tagGroups.map(g => (
        <React.Fragment key={g._id}>
          <SectionTitle>{g.name}</SectionTitle>
          {g.children.length > 0 && (
            <div className='flex flex-wrap'>
              {g.children.map(v => (
                <div key={v._id} className='w-1_3 text-center'>
                  <span
                    className='mx-4 px-3 py-1 text-xs text-gray-800 rounded-full bg-gray-100'
                    onClick={() => Taro.navigateTo({ url: `/pages/paragraph-center/index?tag=${v._id}` })}
                  >
                    {v.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default Category
