/**
 * @name Tags
 * @description 标签列表
 * @author darcrand
 */

import React, { useState, useMemo, Fragment } from 'react'
import { mergeClassNames, navigateToPage } from '@/utils'
import { ScrollView } from '@tarojs/components'
import { useReadyEffect } from '@/hooks/use-ready'
import { useScrollStatus } from '@/hooks/use-scroll-status'
import { apiGetTags, TagGroupModel, TagModel } from '@/apis/tag'
import SectionTitle from '@/components/SectionTitle'

export interface TagsProps {
  show: boolean
}

const Tags: React.FC<TagsProps> = ({ show }) => {
  const [tags, setTags] = useState<TagModel[]>([])

  // 标签列表一般比较少内容, 一次性返回
  const { refreshing, onRefresherRefresh } = useScrollStatus({
    onRefreshing: async () => {
      const res = await apiGetTags()
      setTags(res.list)
    }
  })

  useReadyEffect(onRefresherRefresh, show)

  const tagGroups = useMemo(() => {
    const groups: (TagGroupModel & { children: TagModel[] })[] = []
    tags.forEach(tag => {
      const group = groups.find(g => g._id === tag.group._id)
      if (group) {
        group.children.push(tag)
      } else {
        groups.push({
          ...tag.group,
          children: [tag]
        })
      }
    })
    return groups
  }, [tags])

  return (
    <>
      <ScrollView
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={onRefresherRefresh}
        className={mergeClassNames('h-full', show ? 'visible' : 'hidden invisible')}
      >
        {tagGroups.map(group => (
          <Fragment key={group._id}>
            <SectionTitle>{group.name}</SectionTitle>

            {Array.isArray(group.children) && (
              <section className='flex flex-row flex-wrap mx-2'>
                {group.children.map(tag => (
                  <div key={tag._id} style={{ width: '33.33%' }} onClick={() => navigateToPage('tag', { id: tag._id })}>
                    <span className='block m-2 p-2 text-gray-600 text-center bg-gray-100 rounded-full'>{tag.name}</span>
                  </div>
                ))}
              </section>
            )}
          </Fragment>
        ))}
      </ScrollView>
    </>
  )
}

export default Tags
