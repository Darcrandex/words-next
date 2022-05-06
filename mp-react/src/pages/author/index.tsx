/**
 * @name Author
 * @description 作者详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'

const Author: React.FC = () => {
  return (
    <>
      <h1>Author</h1>

      <p>作品列表</p>
      <ul>
        <li onClick={() => Taro.navigateTo({ url: '/pages/resource/index?id=001' })}>作品 001</li>
      </ul>
    </>
  )
}

export default Author
