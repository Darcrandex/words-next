/**
 * @name TopHeader
 * @description 头部导航
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useSafeArea } from '@/stores/use-safe-area'
import Icon from '@/components/Icon'

import iconBack from '@/assets/icons/icon-back.svg'
import { mergeClassNames } from '@/utils'

export const HEADER_BOTTOM = 5
const iconSize = 18

export interface TopHeaderProps {
  showLeft?: boolean
  className?: string
}

const TopHeader: React.FC<TopHeaderProps> = ({ showLeft = true, className, children }) => {
  const { safeArea } = useSafeArea()

  return (
    <>
      <header
        className={mergeClassNames('px-4 text-gray-800', className)}
        style={{
          paddingTop: safeArea.menuBtnRect.top,
          paddingBottom: HEADER_BOTTOM
        }}
      >
        <div className='flex items-center justify-between' style={{ height: safeArea.menuBtnRect.height }}>
          {showLeft ? (
            <Icon url={iconBack} size={iconSize} onClick={() => Taro.navigateBack()} />
          ) : (
            <i style={{ width: iconSize }}></i>
          )}

          {/* children 作为标题文本 */}
          <span className='text-sm text-gray-800 font-bold'>{children}</span>

          <i style={{ width: iconSize }}></i>
        </div>
      </header>
    </>
  )
}

export default TopHeader
