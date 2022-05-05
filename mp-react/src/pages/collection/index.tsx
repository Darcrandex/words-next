/**
 * @name Collection
 * @description 我的收藏
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import React, { useState, useMemo, useCallback } from 'react'
import { useMount } from 'ahooks'
import { ScrollView } from '@tarojs/components'

import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'
import { useSafeArea } from '@/stores/use-safe-area'
import ScreenLoading from '@/components/ScreenLoading'
import TopHeader, { HEADER_BOTTOM } from '@/components/TopHeader'

const Collection: React.FC = () => {
  const { safeArea } = useSafeArea()

  const [query, setQuery] = useState({ page: 1 })
  const [list, setList] = useState<(Paragraph & { height: number })[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // 下拉刷新/首次获取
  const onRefresherRefresh = useCallback(async () => {
    setLoading(true)
    const res = await apiGetParagraphs()
    setList(res.list.map(v => ({ ...v, height: ~~(Math.random() * 150) + 100 })))
    setTotal(res.total)
    setLoading(false)
    setQuery({ page: 1 })
  }, [])

  // 初始化自动刷新一次
  useMount(onRefresherRefresh)

  // 加载更多
  const onScrollToLower = useCallback(async () => {
    if (list.length < total) {
      setLoading(true)
      const nextQuery = { ...query, page: query.page + 1 }
      setQuery(nextQuery)
      const res = await apiGetParagraphs(nextQuery)
      setList(curr => curr.concat(...res.list.map(v => ({ ...v, height: ~~(Math.random() * 150) + 100 }))))
      setTotal(res.total)
      setLoading(false)
    }
  }, [list.length, total, query])

  // 分左右两栏数据
  const groups = useMemo(() => {
    const leftList: (Paragraph & { height: number })[] = []
    let leftListTotalHeight = 0
    const rightList: (Paragraph & { height: number })[] = []
    let rightListTotalHeight = 0

    list.forEach(item => {
      const currHeight = item.height + item.content.length
      if (leftListTotalHeight > rightListTotalHeight) {
        rightListTotalHeight += currHeight
        rightList.push(item)
      } else {
        leftListTotalHeight += currHeight
        leftList.push(item)
      }
    })

    return [
      { key: 'left', list: leftList },
      { key: 'right', list: rightList }
    ]
  }, [list])

  const scrollHeight = safeArea.screenHeight - safeArea.menuBtnRect.top - safeArea.menuBtnRect.height - HEADER_BOTTOM

  return (
    <>
      <TopHeader>我的收藏</TopHeader>

      <ScrollView
        scrollY
        scrollWithAnimation
        refresherEnabled
        style={{ height: scrollHeight }}
        refresherTriggered={loading}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
      >
        <section className='flex mx-2 pt-4'>
          {groups.map(group => (
            <div key={group.key} className='w-1_2'>
              {group.list.map(v => (
                <article
                  key={v._id}
                  onClick={e => {
                    e.stopPropagation()
                    Taro.navigateTo({ url: `/pages/paragraph-detail/index?id=${v._id}` })
                  }}
                >
                  <section className='rounded overflow-hidden mx-2 mb-4 shadow-m'>
                    <div
                      className='bg-center bg-cover bg-blue-50'
                      style={{ backgroundImage: `url("${v.cover}")`, height: `${v.height}px` }}
                    ></div>
                    <section className='m-2'>
                      {v.content?.split('\n').map(str => (
                        <p key={str} className='mb-1 last:mb-0 text-xs text-gray-600'>
                          {str}
                        </p>
                      ))}
                    </section>

                    <p className='pb-2 px-2'>
                      {!!v.resource?.author?.name && (
                        <span className='inline-block mr-1 text-xs text-gray-400'>{v.resource?.author?.name}</span>
                      )}
                      {!!v.resource?.name && (
                        <span className='inline-block text-xs text-gray-400'>《{v.resource?.name}》</span>
                      )}
                    </p>
                  </section>
                </article>
              ))}
            </div>
          ))}
        </section>

        <div style={{ paddingBottom: safeArea.safeAreaBottom }}></div>
      </ScrollView>

      <ScreenLoading loading={loading} />
    </>
  )
}

export default Collection
