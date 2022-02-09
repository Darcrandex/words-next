import { useDidHide, useDidShow } from '@tarojs/taro'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import 'windi.css'
import './app.less'

const App: React.FC = ({ children }) => {
  useEffect(() => {
    console.log('app mounted !!')
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
