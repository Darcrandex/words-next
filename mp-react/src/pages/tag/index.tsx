/**
 * @name WithTag
 * @description 打标签的句子列表
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { useMemo, useState, useCallback } from 'react'
import { useAsyncEffect } from 'ahooks'

import { useSafeArea } from '@/stores/use-safe-area'
import { useScrollStatus } from '@/hooks/use-scroll-status'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { navigateToPage } from '@/utils'
import { apiGetTagById } from '@/apis/tag'
import TopHeader, { HEADER_BOTTOM } from '@/components/TopHeader'
import ScreenLoading from '@/components/ScreenLoading'

const WithTag: React.FC = () => {
  const tagId = useMemo(() => Taro.getCurrentInstance().router?.params.id ?? '', [])

  const [title, setTitle] = useState('有趣的句子')
  useAsyncEffect(async () => {
    const res = await apiGetTagById(tagId)
    setTitle(`${res.name}的句子`)
  }, [tagId])

  const [query, setQuery] = useState({ page: 1, tag: tagId })
  const [list, setList] = useState<ParagraphModel[]>([])
  const [total, setTotal] = useState(0)

  const { refreshing, loading, onRefresherRefresh, onScrollToLower } = useScrollStatus({
    onRefreshing: async () => {
      const res = await apiGetParagraphs(query)
      setList(res.list)
      setTotal(res.total)
    },
    onLoadMore: useCallback(async () => {
      if (list.length < total) {
        const nextQuery = { ...query, page: query.page + 1 }
        setQuery(nextQuery)
        const res = await apiGetParagraphs(nextQuery)
        setList(curr => curr.concat(res.list))
        setTotal(res.total)
      }
    }, [list.length, query, total])
  })

  useAsyncEffect(onRefresherRefresh, [])

  const { safeArea } = useSafeArea()
  const scrollHeight = safeArea.screenHeight - safeArea.menuBtnRect.top - safeArea.menuBtnRect.height - HEADER_BOTTOM

  return (
    <>
      <TopHeader>{title}</TopHeader>

      <ScrollView
        scrollY
        scrollWithAnimation
        refresherEnabled
        style={{ height: scrollHeight }}
        refresherTriggered={refreshing}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
      >
        <hr style={{ paddingTop: 1 }} />

        {list.map(v => (
          <section
            key={v._id}
            className='flex items-center mx-4 my-8 bg-gray-50 rounded-md shadow-m'
            onClick={() => navigateToPage('paragraph', { id: v._id })}
          >
            <p>{v.content}</p>
          </section>
        ))}
      </ScrollView>

      <ScreenLoading loading={loading} />
    </>
  )
}

export default WithTag
