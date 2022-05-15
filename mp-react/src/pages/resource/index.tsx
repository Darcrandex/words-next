/**
 * @name Resource
 * @description 作品详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useMount } from 'ahooks'
import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { apiGetResource, ResourceModel } from '@/apis/resource'
import { navigateToPage } from '@/utils'
import TopHeader, { HEADER_BOTTOM } from '@/components/TopHeader'
import { useSafeArea } from '@/stores/use-safe-area'
import { ScrollView } from '@tarojs/components'
import SectionTitle from '@/components/SectionTitle'

const Resource: React.FC = () => {
  const { safeArea } = useSafeArea()
  const scrollHeight =
    safeArea.screenHeight -
    safeArea.menuBtnRect.top -
    safeArea.menuBtnRect.height -
    HEADER_BOTTOM -
    safeArea.safeAreaBottom

  const resourceId = Taro.getCurrentInstance().router?.params.id || ''

  const [resource, setResource] = useState<ResourceModel>()
  const [list, setList] = useState<ParagraphModel[]>([])
  useMount(async () => {
    const res = await apiGetResource(resourceId)
    setResource(res)
    const paragraphRes = await apiGetParagraphs({ resource: resourceId })
    setList(paragraphRes.list)
  })

  return (
    <>
      <TopHeader />

      <ScrollView scrollY style={{ height: scrollHeight }}>
        <hr style={{ paddingTop: 1 }} />

        <section>
          <h1 className='text-center'>{resource?.name}</h1>
          <p>{resource?.description}</p>
        </section>

        <SectionTitle>那些被铭记的句子</SectionTitle>

        {list.map(v => (
          <section key={v._id} onClick={() => navigateToPage('paragraph', { id: v._id })}>
            <p>{v.content}</p>
          </section>
        ))}
      </ScrollView>
    </>
  )
}

export default Resource
