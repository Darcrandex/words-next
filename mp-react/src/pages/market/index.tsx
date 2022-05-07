/**
 * @name Market
 * @description 资源市场（不知道叫什么好，反正就是句子上层的资源分类）
 * @author darcrand
 */

import { useEffect, useState } from 'react'
import { useMount } from 'ahooks'
import { apiGetCategories } from '@/apis/category'
import TopHeader from '@/components/TopHeader'
import BottomTabNavs, { BAR_HEIGHT, BAR_RADIUS } from '@/containers/BottomTabNavs'
import { useSafeArea } from '@/stores/use-safe-area'
import { useMarketParams } from '@/stores/use-market-params'
import { mergeClassNames } from '@/utils'
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
    { key: 'author-tab', componentKey: 'author', title: '作者' },
    { key: 'tag-group-tab', componentKey: 'tag-group', title: '标签' }
  ])
  const [tabKey, setTabKey] = useState('author-tab')

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
        <TopHeader showLeft={false}>发现</TopHeader>
        <section className='flex-1 flex'>
          <aside className='w-20 h-full shrink-0 bg-pink-100'>
            {tabs.map(v => (
              <span
                key={v.key}
                className={mergeClassNames('p-2 text-sm', tabKey === v.key ? 'text-theme' : 'text-gray-800')}
                onClick={() => setTabKey(v.key)}
              >
                {v.title}
              </span>
            ))}
          </aside>

          <main className='flex-1 h-full bg-green-100'>
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
