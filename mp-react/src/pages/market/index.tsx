/**
 * @name Market
 * @description 资源市场（不知道叫什么好，反正就是句子上层的资源分类）
 * @author darcrand
 */

import { useEffect, useState } from 'react'
import { useMount } from 'ahooks'
import BottomTabNavs, { BAR_HEIGHT, BAR_RADIUS } from '@/containers/BottomTabNavs'
import TopSearch from '@/components/TopSearch'
import { useSafeArea } from '@/stores/use-safe-area'
import { useMarketParams } from '@/stores/use-market-params'
import { apiGetCategories } from '@/apis/category'
import { mergeClassNames, navigateToPage } from '@/utils'

import Resources from './Resources'
import Authors from './Authors'
import Tags from './Tags'

type ComponentKey = 'author' | 'resource' | 'tag-group'
interface TabItem {
  key: string
  title: string
  componentKey: ComponentKey
}

const Market: React.FC = () => {
  const { safeArea } = useSafeArea()
  const height = safeArea.screenHeight - safeArea.safeAreaBottom - BAR_HEIGHT + BAR_RADIUS

  const [tabs, setTabs] = useState<TabItem[]>([
    { key: 'author-tab', componentKey: 'author', title: '作者赛高' },
    { key: 'tag-group-tab', componentKey: 'tag-group', title: '贴上标签' }
  ])

  const [tabKey, setTabKey] = useState('author-tab')
  const currActiveTabIndex = tabs.findIndex(v => v.key === tabKey)

  useMount(async () => {
    const categoryRes = await apiGetCategories()
    const categoryTabs: TabItem[] = categoryRes.list.map(v => ({
      key: v._id,
      title: v.name,
      componentKey: 'resource'
    }))

    setTabs(curr => curr.concat(categoryTabs))
  })

  // 当从 home 页面点击分类链接跳转时，获取点击的分类 id，设置 tabKey
  const { params } = useMarketParams()
  useEffect(() => {
    if (params.categoryId) {
      setTabKey(params.categoryId)
    }
  }, [params.categoryId])

  return (
    <>
      <section className='flex flex-col' style={{ height }}>
        <TopSearch onClick={() => navigateToPage('search-result')} />

        <section className='flex-1 flex'>
          <aside className='w-24 h-full shrink-0 bg-gray-50'>
            {tabs.map((v, i) => (
              <div key={v.key} className='bg-white' onClick={() => setTabKey(v.key)}>
                <span
                  className={mergeClassNames(
                    'py-4 bg-gray-50 text-sm text-center',
                    tabKey === v.key ? 'text-theme bg-white' : 'text-gray-800',
                    i === currActiveTabIndex - 1 && 'rounded-br-xl',
                    i === currActiveTabIndex + 1 && 'rounded-tr-xl'
                  )}
                >
                  {v.title}
                </span>
              </div>
            ))}

            <div className='bg-white'>
              <span
                className={mergeClassNames(
                  'h-10 bg-gray-50',
                  currActiveTabIndex === tabs.length - 1 && 'rounded-tr-xl'
                )}
              ></span>
            </div>
          </aside>

          <main className='flex-1 h-full'>
            {tabs.map(v =>
              v.componentKey === 'resource' ? (
                <Resources show={tabKey === v.key} categoryId={v.key} />
              ) : v.componentKey === 'author' ? (
                <Authors show={tabKey === v.key} />
              ) : (
                <Tags show={tabKey === v.key} />
              )
            )}
          </main>
        </section>
      </section>

      <BottomTabNavs />
    </>
  )
}

export default Market
