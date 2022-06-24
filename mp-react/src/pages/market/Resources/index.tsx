/**
 * @name Resources
 * @description 作品列表
 * @author darcrand
 */

import { useState, useCallback } from 'react'
import { mergeClassNames, navigateToPage } from '@/utils'
import { useScrollStatus } from '@/hooks/use-scroll-status'
import { useReadyEffect } from '@/hooks/use-ready'
import { apiGetResources, ResourceModel } from '@/apis/resource'
import { ScrollView } from '@tarojs/components'
import ScreenLoading from '@/components/ScreenLoading'

export interface ResourcesProps {
  show: boolean
  categoryId: string
}

const Resources: React.FC<ResourcesProps> = ({ show, categoryId }) => {
  const [query, setQuery] = useState({ page: 1, category: categoryId })
  const [list, setList] = useState<ResourceModel[]>([])
  const [total, setTotal] = useState(0)

  const { refreshing, loading, onRefresherRefresh, onScrollToLower } = useScrollStatus({
    onRefreshing: async () => {
      const res = await apiGetResources(query)
      setList(res.list)
      setTotal(res.total)
    },
    onLoadMore: useCallback(async () => {
      if (list.length < total) {
        const nextQuery = { ...query, page: query.page + 1 }
        setQuery(nextQuery)
        const res = await apiGetResources(nextQuery)
        setList(curr => curr.concat(res.list))
        setTotal(res.total)
      }
    }, [list.length, query, total])
  })

  useReadyEffect(onRefresherRefresh, show)

  return (
    <>
      <ScrollView
        scrollY
        scrollWithAnimation
        refresherEnabled
        className={mergeClassNames('h-full', show ? 'visible' : 'hidden invisible')}
        refresherTriggered={refreshing}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
      >
        <hr style={{ paddingTop: 1 }} />

        {list.map(v => (
          <section
            key={v._id}
            className='flex items-center mx-4 my-8 bg-gray-50 rounded-md shadow-m'
            onClick={() => navigateToPage('resource', { id: v._id })}
          >
            <p>{v.name}</p>
          </section>
        ))}
      </ScrollView>

      <ScreenLoading loading={refreshing || loading} />
    </>
  )
}

export default Resources
