/**
 * @name SearchResult
 * @description 搜索结果页面
 * @author darcrand
 */

import { Button, Input, ScrollView } from '@tarojs/components'
import { useCallback, useState } from 'react'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'

const SearchResult: React.FC = () => {
  const [query, setQuery] = useState({ page: 1 })
  const [keywords, setKeywords] = useState('')
  const [list, setList] = useState<ParagraphModel[]>([])
  const [total, setTotal] = useState(0)

  const onSearch = async () => {
    const res = await apiGetParagraphs({ keywords })
    setList(res.list)
    setTotal(res.total)
  }

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
      <Input autoFocus value={keywords} onInput={e => setKeywords(e.detail.value)} />
      <Button onClick={onSearch}>search</Button>

      <ScrollView scrollY style={{ height: 500 }} scrollWithAnimation onScrollToLower={onScrollToLower}>
        {list.map(v => (
          <div key={v._id}>
            <p>{v.content}</p>
            <p>{v.resource.author.name}</p>
          </div>
        ))}
      </ScrollView>
    </>
  )
}

export default SearchResult
