/**
 * @name TopHeader
 * @description 头部导航
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useSafeArea } from '@/stores/use-safe-area'
import Icon from '@/components/Icon'

import iconBack from '@/assets/icons/icon-back.svg'

export const HEADER_BOTTOM = 5
const iconSize = 20

export interface TopHeaderProps {
  showLeft?: boolean
}

const TopHeader: React.FC<TopHeaderProps> = ({ showLeft = true, children }) => {
  const { safeArea } = useSafeArea()

  return (
    <>
      <header
        className='px-4 text-gray-800 shadow-s'
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
          <span className='text-sm text-gray-800'>{children}</span>

          <i style={{ width: iconSize }}></i>
        </div>
      </header>
    </>
  )
}

export default TopHeader
