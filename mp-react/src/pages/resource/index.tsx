/**
 * @name Resource
 * @description 作品详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'

const Resource: React.FC = () => {
  return (
    <>
      <h1>Resource</h1>

      <p>句子列表</p>
      <ul>
        <li onClick={() => Taro.navigateTo({ url: '/pages/paragraph/index?id=001' })}>作品 001</li>
      </ul>
    </>
  )
}

export default Resource
