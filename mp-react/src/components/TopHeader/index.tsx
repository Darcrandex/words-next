/**
 * @name TopHeader
 * @description 头部导航
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useSafeArea } from '@/stores/use-safe-area'
import Icon from '@/components/Icon'

import iconBack from '@/assets/icons/icon-back.svg'
import iconBackWhite from '@/assets/icons/icon-back-white.svg'
import { mergeClassNames } from '@/utils'

export const HEADER_BOTTOM = 5
export const ICON_SIEZE = 18

export interface TopHeaderProps {
  showLeft?: boolean
  className?: string
  theme?: 'white' | 'dark'
  ghost?: boolean
  fixed?: boolean // 是否固定在顶部
  fillup?: boolean // 当 fixed 时, 是否自动补全高度
}

const TopHeader: React.FC<TopHeaderProps> = ({
  showLeft = true,
  className,
  fixed,
  fillup = true,
  theme = 'white',
  ghost,
  children
}) => {
  const { safeArea } = useSafeArea()
  const headerHeight = safeArea.menuBtnRect.top + safeArea.menuBtnRect.height + HEADER_BOTTOM

  return (
    <>
      <header
        className={mergeClassNames(
          'text-gray-800',
          fixed && 'fixed top-0 left-0 right-0 z-10',
          ghost ? 'bg-transparent' : theme === 'dark' ? 'bg-gray-600' : 'bg-white',
          className
        )}
        style={{
          paddingTop: safeArea.menuBtnRect.top,
          paddingBottom: HEADER_BOTTOM
        }}
      >
        <div className='flex items-center justify-between' style={{ height: safeArea.menuBtnRect.height }}>
          <div
            className='flex items-center pl-4 h-full'
            style={{ width: 2 * ICON_SIEZE }}
            onClick={() => showLeft && Taro.navigateBack()}
          >
            {showLeft && <Icon url={theme === 'white' ? iconBack : iconBackWhite} size={ICON_SIEZE} />}
          </div>

          {/* children 作为标题文本 */}
          <span
            className={mergeClassNames(
              'text-sm font-bold truncate',
              theme === 'white' ? 'text-gray-800' : 'text-gray-50'
            )}
          >
            {children}
          </span>

          <i className='pr-4' style={{ width: 2 * ICON_SIEZE }}></i>
        </div>
      </header>

      {fixed && fillup && <div style={{ height: headerHeight }}></div>}
    </>
  )
}

export default TopHeader
