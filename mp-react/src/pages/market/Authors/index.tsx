/**
 * @name Authors
 * @description 作者列表
 * @author darcrand
 */

import { useCallback, useState } from 'react'
import { ScrollView } from '@tarojs/components'
import Avatar from '@/components/Avatar'
import { mergeClassNames, navigateToPage } from '@/utils'
import { apiGetAuthors, AuthorModel } from '@/apis/author'
import { useReadyEffect } from '@/hooks/use-ready'
import { useScrollStatus } from '@/hooks/use-scroll-status'
import ScreenLoading from '@/components/ScreenLoading'

export interface AuthorsProps {
  show: boolean
}

const Authors: React.FC<AuthorsProps> = ({ show }) => {
  const [query, setQuery] = useState({ page: 1 })
  const [list, setList] = useState<AuthorModel[]>([])
  const [total, setTotal] = useState(0)

  const { refreshing, loading, onRefresherRefresh, onScrollToLower } = useScrollStatus({
    onRefreshing: async () => {
      const res = await apiGetAuthors()
      setList(res.list)
      setTotal(res.total)
    },
    onLoadMore: useCallback(async () => {
      if (list.length < total) {
        const nextQuery = { ...query, page: query.page + 1 }
        setQuery(nextQuery)
        const res = await apiGetAuthors(nextQuery)
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
            onClick={() => navigateToPage('author', { id: v._id })}
          >
            <Avatar src={v.cover} className='mx-4 rounded-md transform -translate-y-4 shadow-s' />

            <article className='flex-1 mr-4'>
              <h2 className='text-gray-800 text-sm'>{v.name}</h2>
              <div className='relative h-6'>
                <p className='absolute top-0 left-0 w-full text-gray-600 text-xs truncate'>
                  {v.description || '还没有任何的描述。。。'}
                </p>
              </div>
            </article>
          </section>
        ))}
      </ScrollView>

      <ScreenLoading loading={refreshing || loading} />
    </>
  )
}

export default Authors
