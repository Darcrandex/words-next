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
import Empty from '@/components/Empty'

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

        <section className='flex flex-wrap mx-2'>
          {list.map(v => (
            <div key={v._id} style={{ width: '50%' }} onClick={() => navigateToPage('resource', { id: v._id })}>
              <i
                className='block h-32 my-2 mx-auto rounded-lg bg-gray-100 bg-center bg-cover'
                style={{
                  width: '80%',
                  backgroundImage: `url('${v.cover || 'https://img.shuicaimi.com/2020/12/%E5%9B%BE%E7%89%87-5.png'}')`
                }}
              ></i>
              <p className='text-center text-xs text-gray-600'>{v.name}</p>
            </div>
          ))}

          {total === 0 && <Empty />}
        </section>
      </ScrollView>

      <ScreenLoading loading={refreshing || loading} />
    </>
  )
}

export default Resources
