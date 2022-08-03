/**
 * @name SearchResult
 * @description 搜索结果页面
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { Input, ScrollView } from '@tarojs/components'
import { useCallback, useState } from 'react'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { useSafeArea } from '@/stores/use-safe-area'
import { mergeClassNames } from '@/utils'

import { HEADER_BOTTOM, ICON_SIEZE } from '@/components/TopHeader'
import Icon from '@/components/Icon'
import Empty from '@/components/Empty'
import iconBack from '@/assets/icons/icon-back.svg'
import iconSearch from '@/assets/icons/icon-search-gray-400.svg'
import iconClose from '@/assets/icons/icon-close.svg'

import HotKeywords from './HotKeywords'
import KeywordsTips from './KeywordsTips'

const SearchResult: React.FC = () => {
  const { safeArea } = useSafeArea()
  const scrollHeight = safeArea.screenHeight - safeArea.menuBtnRect.top - safeArea.menuBtnRect.height - HEADER_BOTTOM

  const [query, setQuery] = useState({ page: 1 })
  const [keywords, setKeywords] = useState('')
  const [list, setList] = useState<ParagraphModel[]>([])
  const [total, setTotal] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  const InputFocus = () => {
    // 聚焦时先清空当前搜索结果
    setList([])
    setTotal(0)
    setDataLoaded(false)
  }

  const onSearch = async () => {
    const res = await apiGetParagraphs({ keywords })
    setList(res.list)
    setTotal(res.total)
    setDataLoaded(true)
  }

  const onKeywordsClick = (str: string) => {
    setKeywords(str)
    onSearch()
  }

  const onClear = () => {
    setKeywords('')
    setList([])
    setTotal(0)
    setDataLoaded(false)
  }

  // 只需要加载更多, 不需要下拉刷新
  const onScrollToLower = useCallback(async () => {
    if (list.length === total) return

    try {
      const nextQuery = { ...query, page: query.page + 1, keywords }
      setQuery(nextQuery)

      const res = await apiGetParagraphs(nextQuery)
      setList(curr => curr.concat(res.list))
      setTotal(res.total)
    } catch (error) {}
  }, [list.length, total, query, keywords])

  return (
    <>
      <header
        className='flex items-center'
        style={{ width: safeArea.menuBtnRect.left, paddingTop: safeArea.menuBtnRect.top, paddingBottom: HEADER_BOTTOM }}
      >
        <div className='flex items-center pl-4' onClick={() => Taro.navigateBack()}>
          <Icon url={iconBack} size={ICON_SIEZE} />
        </div>

        <section
          className='relative flex items-center flex-1 mx-4 px-2 rounded-full bg-gray-100'
          style={{ height: safeArea.menuBtnRect.height }}
        >
          <Icon url={iconSearch} size={20} />
          <Input
            className='flex-1 ml-1 text-gray-400 text-xs'
            autoFocus
            value={keywords}
            confirmType='search'
            maxlength={10}
            placeholder='今晚的夜色真美'
            onFocus={InputFocus}
            onInput={e => setKeywords(e.detail.value)}
            onConfirm={onSearch}
          />

          <div
            className={mergeClassNames(
              'absolute top-0 right-0 z-2 flex items-center justify-center transition-all',
              keywords.trim().length === 0 && 'opacity-0'
            )}
            style={{ width: safeArea.menuBtnRect.height, height: safeArea.menuBtnRect.height }}
            onClick={onClear}
          >
            <Icon url={iconClose} size={20} />
          </div>
        </section>
      </header>

      <ScrollView scrollY style={{ height: scrollHeight }} scrollWithAnimation onScrollToLower={onScrollToLower}>
        {list.map(v => (
          <div key={v._id}>
            <p>{v.content}</p>
            <p>{v.resource.author.name}</p>
          </div>
        ))}

        {keywords.trim().length === 0 && <HotKeywords onKeywordsClick={onKeywordsClick} />}

        {keywords.trim().length !== 0 && !dataLoaded && (
          <KeywordsTips keywords={keywords} onKeywordsClick={onKeywordsClick} />
        )}

        {keywords.trim().length !== 0 && dataLoaded && total === 0 && <Empty />}

        <div style={{ height: safeArea.safeAreaBottom }}></div>
      </ScrollView>
    </>
  )
}

export default SearchResult
