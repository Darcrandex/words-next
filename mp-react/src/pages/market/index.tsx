/**
 * @name Market
 * @description 资源市场
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useMount } from 'ahooks'
import { apiGetCategories } from '@/apis/category'
import { apiGetTagGroups } from '@/apis/tag'

const Market: React.FC = () => {
  const [tabs, setTabs] = useState([])

  useMount(() => {
    apiGetCategories()
    apiGetTagGroups()
  })

  return (
    <>
      <h1>Market</h1>

      <section>
        <p>作者</p>
        <ul>
          <li onClick={() => Taro.navigateTo({ url: '/pages/author/index?id=aaa' })}>作者 a</li>
        </ul>
      </section>

      <section>
        <p>作品</p>
        <ul>
          <li onClick={() => Taro.navigateTo({ url: '/pages/resource/index?id=bbb' })}>作品 a</li>
        </ul>
      </section>

      <section>
        <p>标签</p>
        <ul>
          <li onClick={() => Taro.navigateTo({ url: '/pages/tag/index?id=bbb' })}>标签 a</li>
        </ul>
      </section>
    </>
  )
}

export default Market
