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
  fixed?: boolean // 是否固定在顶部
}

const TopHeader: React.FC<TopHeaderProps> = ({ showLeft = true, className, fixed, children }) => {
  const { safeArea } = useSafeArea()
  const headerHeight = safeArea.menuBtnRect.top + safeArea.menuBtnRect.height + HEADER_BOTTOM

  return (
    <>
      <header
        className={mergeClassNames('px-4 text-gray-800 bg-white', fixed && 'fixed top-0 left-0 right-0', className)}
        style={{
          paddingTop: safeArea.menuBtnRect.top,
          paddingBottom: HEADER_BOTTOM
        }}
      >
        <div className='flex items-center justify-between' style={{ height: safeArea.menuBtnRect.height }}>
          <div style={{ width: 2 * iconSize }} onClick={() => showLeft && Taro.navigateBack()}>
            {showLeft && <Icon url={iconBack} size={iconSize} />}
          </div>

          {/* children 作为标题文本 */}
          <span className='text-sm text-gray-800 font-bold'>{children}</span>

          <i style={{ width: 2 * iconSize }}></i>
        </div>
      </header>

      {fixed && <div style={{ height: headerHeight }}></div>}
    </>
  )
}

export default TopHeader
