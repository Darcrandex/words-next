/**
 * @name Divider
 * @description taiwindcss 的 border 在这个项目里表现得很奇怪
 * @author darcrand
 */

import { mergeClassNames } from '@/utils'
import './styles.less'

interface DividerProps {
  className?: string
  style?: React.CSSProperties
}

const Divider: React.FC<DividerProps> = props => {
  return (
    <>
      <div className={mergeClassNames('divider', props.className)} style={props.style}>
        <i className='line bg-gray-100'></i>
        {!!props.children && <div className='mx-2 text-gray-100 text-sm'>{props.children}</div>}
        <i className='line bg-gray-100'></i>
      </div>
    </>
  )
}

export default Divider
