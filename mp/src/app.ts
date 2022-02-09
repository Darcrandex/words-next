import Taro from '@tarojs/taro'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'windi.css'

import './app.less'
import { useAppSettings } from './stores/app-settings'

const App = createApp({
  async onLaunch() {
    console.log('app launch')
    const { updateSettings } = useAppSettings()
    const res = await Taro.getSystemInfo()
    console.log('res', res)
    updateSettings(res.safeArea)
  },
  onShow(options) {
    console.log('app options', options)
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())

export default App
