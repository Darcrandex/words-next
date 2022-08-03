/**
 * @name HotKeywords
 * @description 热搜
 * @author darcrand
 */

interface IProps {
  onKeywordsClick?: (keywords: string) => void
}
const HotKeywords: React.FC<IProps> = () => {
  return (
    <>
      <h1>HotKeywords</h1>
    </>
  )
}

export default HotKeywords
