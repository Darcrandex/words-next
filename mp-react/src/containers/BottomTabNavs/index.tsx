/**
 * @name BottomTabNavs
 * @description 自定义底部导航
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import React, { useCallback, useMemo } from 'react'
import { useSafeArea } from '@/stores/use-safe-area'

import icoHome from '@/assets/icons/tab-home.svg'
import icoHomeActive from '@/assets/icons/tab-home-active.svg'
import icoMine from '@/assets/icons/tab-mine.svg'
import icoMineActive from '@/assets/icons/tab-mine-active.svg'

import './index.less'

const list = [
  {
    pagePath: 'pages/home/index',
    text: '',
    iconPath: icoHome,
    selectedIconPath: icoHomeActive
  },
  {
    pagePath: 'pages/market/index',
    text: '',
    iconPath: icoHome,
    selectedIconPath: icoHomeActive
  },
  {
    pagePath: 'pages/mine/index',
    text: '',
    iconPath: icoMine,
    selectedIconPath: icoMineActive
  }
]

// 底部导航的内容高度
export const BAR_HEIGHT = 42

// 导航条顶部的圆角尺寸
export const BAR_RADIUS = 22

const BottomTabNavs: React.FC = () => {
  const currPath = useMemo(() => Taro.getCurrentInstance().router?.path, [])
  const { safeArea } = useSafeArea()

  const onTab = useCallback((url: string) => {
    // 不知道为啥要加 '/'
    Taro.switchTab({ url: '/' + url })
  }, [])

  return (
    <>
      <footer
        className='fixed z-100 left-0 bottom-0 right-0 flex items-center bg-white rounded-t-4xl overflow-hidden bottom-nav-bar'
        style={{
          paddingBottom: safeArea.safeAreaBottom,
          borderTopLeftRadius: BAR_RADIUS,
          borderTopRightRadius: BAR_RADIUS
        }}
      >
        {list.map(v => (
          <div
            key={v.pagePath}
            className='flex flex-col flex-1 items-center justify-center'
            style={{ height: BAR_HEIGHT }}
            onClick={() => onTab(v.pagePath)}
          >
            <Image
              src={currPath?.includes(v.pagePath) ? v.selectedIconPath : v.iconPath}
              mode='aspectFill'
              style={{ width: BAR_HEIGHT - 16, height: BAR_HEIGHT - 16 }}
            />
          </div>
        ))}
      </footer>
    </>
  )
}

export default BottomTabNavs
