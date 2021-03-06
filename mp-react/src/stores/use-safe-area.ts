import Taro from '@tarojs/taro'
import { useMount } from 'ahooks'
import { atom, useRecoilState } from 'recoil'

const stateAtom = atom({
  key: 'safe-area',
  default: {
    statusBarHeight: 0, // 手机顶部状态栏的高度
    menuBtnRect: { height: 0, top: 0, left: 0 }, // 胶囊的位置信息
    safeAreaBottom: 0, // 全面屏手机底部应该预留的高度
    screenWidth: 0, // 整个屏幕的宽度
    screenHeight: 0 // 整个屏幕的高度
  }
})

export function useSafeArea() {
  const [safeArea, updateSafeArea] = useRecoilState(stateAtom)

  useMount(async () => {
    const systomInfo = await Taro.getSystemInfo()
    const rect = Taro.getMenuButtonBoundingClientRect()

    console.log('systomInfo.screenHeight', systomInfo.screenHeight)

    updateSafeArea({
      statusBarHeight: systomInfo.statusBarHeight,
      menuBtnRect: { height: rect.height, top: rect.top, left: rect.left },
      safeAreaBottom: systomInfo.safeArea.bottom - systomInfo.safeArea.height,
      screenWidth: systomInfo.screenWidth,
      screenHeight: systomInfo.screenHeight
    })
  })

  return { safeArea }
}
