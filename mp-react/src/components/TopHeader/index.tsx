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

const TopHeader: React.FC = props => {
  const { safeArea } = useSafeArea()

  return (
    <>
      <header
        className='px-4 text-gray-800 shadow-s'
        style={{
          paddingTop: safeArea.menuBtnRect.top,
          paddingBottom: HEADER_BOTTOM
        }}
        onClick={() => Taro.navigateBack()}
      >
        <div className='flex items-center justify-between' style={{ height: safeArea.menuBtnRect.height }}>
          <Icon url={iconBack} size={iconSize} />

          <span className='text-sm text-gray-800'>{props.children}</span>

          <i style={{ width: iconSize }}></i>
        </div>
      </header>
    </>
  )
}

export default TopHeader
