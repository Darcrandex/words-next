/**
 * @name Resource
 * @description 作品详情
 * @author darcrand
 */

import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useMount } from 'ahooks'
import { ScrollView } from '@tarojs/components'
import SectionTitle from '@/components/SectionTitle'
import Divider from '@/components/Divider'
import TopHeader from '@/components/TopHeader'

import { apiGetParagraphs, ParagraphModel } from '@/apis/paragraph'
import { apiGetResource, ResourceModel } from '@/apis/resource'
import { navigateToPage } from '@/utils'
import { useSafeArea } from '@/stores/use-safe-area'

import './styles.less'

const Resource: React.FC = () => {
  const { safeArea } = useSafeArea()
  const scrollHeight = safeArea.screenHeight - safeArea.safeAreaBottom

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
      <TopHeader ghost theme='dark' fixed fillup={false} />

      <ScrollView scrollY style={{ height: scrollHeight }}>
        <section
          className='relative w-full h-96 bg-center bg-cover bg-gray-200'
          style={{
            backgroundImage: `url('${resource?.cover ||
              'https://th.bing.com/th/id/R.99530999eb4b116c3485d1a7747d25d4?rik=9aAfMvj4H%2fO2Xw&riu=http%3a%2f%2fi0.hdslb.com%2fbfs%2farchive%2f8a1b88cbf28a426c5f7eb3e1034b62d1ffeddfe3.jpg&ehk=gmYyXMf4nQONmIa%2bbry3889tPlIV%2f2qJsd5O%2bWjczAI%3d&risl=&pid=ImgRaw&r=0'}')`
          }}
        >
          <div className='resource-cover-bg'></div>
        </section>

        <section className='relative z-1 -mt-12 px-4'>
          <h1 className='mb-2 text-center text-gray-800 text-lg font-bold'>{resource?.name}</h1>
          <div className='text-gray-600 text-sm indent-2 tracking-wide'>
            {resource?.description ? (
              resource.description.split('\n').map(str => (
                <p className='mb-2' key={str}>
                  {str}
                </p>
              ))
            ) : (
              <p>并没有留下什么...</p>
            )}
          </div>
        </section>

        <SectionTitle>那些被铭记的句子</SectionTitle>

        {list.map(v => (
          <section key={v._id} className='m-4' onClick={() => navigateToPage('paragraph', { id: v._id })}>
            <p className='mx-2 my-4 text-gray-600'>{v.content}</p>
            <p className='mb-4 text-gray-400 text-sm text-right'>
              —— {v.resource.author.name} 《{v.resource.name}》
            </p>

            <Divider />
          </section>
        ))}
      </ScrollView>
    </>
  )
}

export default Resource
