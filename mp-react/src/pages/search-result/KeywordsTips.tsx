/**
 * @name KeywordsTips
 * @description 搜索关键词提示列表
 * @author darcrand
 */

import { useEffect, useMemo, useState } from 'react'
import { apiGetWordsTips } from '@/apis/paragraph'
import { mergeClassNames, randomStr } from '@/utils'

interface IProps {
  keywords?: string
  onKeywordsClick?: (keywords: string) => void
}

const KeywordsTips: React.FC<IProps> = props => {
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      clearTimeout(t)
      if (props.keywords) {
        apiGetWordsTips(props.keywords).then(setList)
      }
    }, 1000)

    return () => clearTimeout(t)
  }, [props.keywords])

  const tipsList: {
    id: string
    text: string
    children: { id: string; text: string; highlight: boolean }[]
  }[] = useMemo(() => {
    return list.map(str => ({
      id: randomStr(),
      // 原来的文本
      text: str,
      // 处理要高亮的字符
      children: !!props.keywords
        ? str
            .replace(props.keywords, $1 => `|${$1}|`)
            .split('|')
            .map(s => ({ id: randomStr(), text: s, highlight: s === props.keywords }))
        : []
    }))
  }, [list, props.keywords])

  return (
    <>
      <ul className='m-4'>
        {tipsList.map(g => (
          <li key={g.id} className='py-2 border-bottom' onClick={() => props.onKeywordsClick?.(g.text)}>
            {g.children.map(s => (
              <span key={s.id} className={mergeClassNames('inline text-sm', s.highlight && 'text-rose-500 font-bold')}>
                {s.text}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </>
  )
}

export default KeywordsTips
