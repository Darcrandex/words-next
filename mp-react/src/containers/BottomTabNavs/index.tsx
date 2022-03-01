/**
 * @name BottomTabNavs
 * @description 自定义底部导航
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useSafeArea } from '@/stores/use-safe-area'

import icoHome from '@/assets/icons/tab-home.png'
import icoMine from '@/assets/icons/tab-mine.png'

import './index.less'

const list = [
  {
    pagePath: 'pages/home/index',
    text: '',
    iconPath: icoHome,
    selectedIconPath: 'assets/icons/tab-home-active.png'
  },
  {
    pagePath: 'pages/category/index',
    text: '',
    iconPath: icoHome,
    selectedIconPath: 'assets/icons/tab-home-active.png'
  },
  {
    pagePath: 'pages/mine/index',
    text: '',
    iconPath: icoMine,
    selectedIconPath: 'assets/icons/tab-mine-active.png'
  }
]

// 底部导航的内容高度
export const BAR_HEIGHT = 42

const BottomTabNavs: React.FC = () => {
  const currPath = useMemo(() => Taro.getCurrentInstance().router?.path, [])
  const { safeArea } = useSafeArea()

  useEffect(() => {
    console.log('currPath', currPath)
  }, [currPath])

  const onTab = useCallback((url: string) => {
    Taro.switchTab({ url })
  }, [])
  return (
    <>
      <footer
        className='fixed z-100 left-0 bottom-0 right-0 flex items-center bg-white rounded-t-2xl overflow-hidden bottom-nav-bar'
        style={{ paddingBottom: safeArea.safeAreaBottom }}
      >
        {list.map(v => (
          <div
            key={v.pagePath}
            className={`flex flex-col items-center justify-center w-1_${list.length}`}
            style={{ height: BAR_HEIGHT }}
            onClick={() => onTab('/' + v.pagePath)}
          >
            <Image src={v.iconPath} mode='aspectFill' style={{ width: BAR_HEIGHT - 16, height: BAR_HEIGHT - 16 }} />
          </div>
        ))}
      </footer>
    </>
  )
}

export default BottomTabNavs
