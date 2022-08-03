import { useDidHide, useDidShow } from '@tarojs/taro'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import 'windi.css'
import './app.less'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const App: React.FC = ({ children }) => {
  useEffect(() => {
    console.log('app mounted !!', process.env.MODE)
  }, [])
  useDidShow(() => console.log('app show'))
  useDidHide(() => console.log('app hide'))

  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  )
}

export default App
