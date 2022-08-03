/**
 * @name KeywordsTips
 * @description 搜索关键词提示列表
 * @author darcrand
 */

import { useEffect } from 'react'

interface IProps {
  keywords?: string
  onKeywordsClick?: (keywords: string) => void
}

const KeywordsTips: React.FC<IProps> = props => {
  useEffect(() => {
    const t = setTimeout(() => {
      clearTimeout(t)
      console.log('搜索关键字', props.keywords)
    }, 1000)

    return () => clearTimeout(t)
  }, [props.keywords])

  return (
    <>
      <h1>KeywordsTips</h1>
    </>
  )
}

export default KeywordsTips
