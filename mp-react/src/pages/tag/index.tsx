/**
 * @name WithTag
 * @description 打标签的句子列表
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import TopHeader from '@/components/TopHeader'

const WithTag: React.FC = () => {
  return (
    <>
      <TopHeader>高兴的句子</TopHeader>

      <p onClick={() => Taro.navigateTo({ url: '/pages/paragraph/index?id=001' })}>aaaaaaaa</p>
      <p onClick={() => Taro.navigateTo({ url: '/pages/paragraph/index?id=001' })}>aaaaaaaa</p>
      <p onClick={() => Taro.navigateTo({ url: '/pages/paragraph/index?id=001' })}>aaaaaaaa</p>
      <p onClick={() => Taro.navigateTo({ url: '/pages/paragraph/index?id=001' })}>aaaaaaaa</p>
      <p onClick={() => Taro.navigateTo({ url: '/pages/paragraph/index?id=001' })}>aaaaaaaa</p>
    </>
  )
}

export default WithTag
