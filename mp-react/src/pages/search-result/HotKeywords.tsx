/**
 * @name HotKeywords
 * @description 热搜
 * @author darcrand
 */

import { useState } from 'react'
import { useMount } from 'ahooks'
import SectionTitle from '@/components/SectionTitle'
import { apiGetHotWords } from '@/apis/paragraph'

interface IProps {
  onKeywordsClick?: (keywords: string) => void
}

const HotKeywords: React.FC<IProps> = ({ onKeywordsClick }) => {
  const [hotWords, setWords] = useState<string[]>([])

  useMount(async () => {
    const list = await apiGetHotWords()
    setWords(list)
  })

  return (
    <>
      <SectionTitle>你是不是想找这些?</SectionTitle>

      <section className='m-4'>
        {hotWords.map(v => (
          <span
            key={v}
            className='inline-block mr-2 mb-2 px-2 py-1 rounded bg-rose-50 text-rose-400 text-xs'
            onClick={() => onKeywordsClick?.(v)}
          >
            {v}
          </span>
        ))}
      </section>
    </>
  )
}

export default HotKeywords
