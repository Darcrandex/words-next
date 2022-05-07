/**
 * @name Tag
 * @description 标签
 * @author darcrand
 */

import { mergeClassNames, navigateToPage } from '@/utils'

interface TagProps {
  link?: string
  onClick?: React.MouseEventHandler<HTMLSpanElement>
  className?: string
}

const Tag: React.FC<TagProps> = props => {
  const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // 点击事件
    // onClick 优先
    if (props.onClick) {
      props.onClick(e)
    } else if (props.link) {
      navigateToPage(props.link)
    }
  }

  return (
    <>
      <span
        onClick={onClick}
        className={mergeClassNames('inline-block px-2 py-1 text-xs text-gray-600 rounded bg-gray-50', props.className)}
      >
        {props.children}
      </span>
    </>
  )
}

export default Tag
