/**
 * @name Mine
 * @description
 * @author darcrand
 */

import React, { useState, useEffect, useMemo } from 'react'
import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'
import SectionTitle from '@/components/SectionTitle'
import { mergeClassNames } from '@/utils'
import { useUser } from '@/stores/use-user'
import './styles.less'

const Mine: React.FC = () => {
  const { info, hadLogined, signUp } = useUser()

  const [list, setList] = useState<(Paragraph & { height: number })[]>([])
  useEffect(() => {
    apiGetParagraphs().then(res => setList(res.list.map(v => ({ ...v, height: ~~(Math.random() * 150) + 100 }))))
  }, [])
  const groups = useMemo(() => {
    const leftList: (Paragraph & { height: number })[] = []
    let leftListTotalHeight = 0
    const rightList: (Paragraph & { height: number })[] = []
    let rightListTotalHeight = 0

    list.forEach(item => {
      const currHeight = item.height + item.content.length
      if (leftListTotalHeight > rightListTotalHeight) {
        rightListTotalHeight += currHeight
        rightList.push(item)
      } else {
        leftListTotalHeight += currHeight
        leftList.push(item)
      }
    })

    return [
      { key: 'left', list: leftList },
      { key: 'right', list: rightList }
    ]
  }, [list])

  return (
    <>
      <section className='relative p-4 pt-0 overflow-hidden'>
        <div className='rounded-bg bg-red-400'></div>
        <div className='relative z-2 p-4 rounded-lg bg-gray-50 shadow-lg' onClick={signUp}>
          <section className='flex items-center'>
            <div
              className='mr-2 w-15 h-15 rounded-full shadow-md bg-gray-300 bg-center bg-cover'
              style={{ backgroundImage: `url("${info.avatarUrl}")` }}
            ></div>
            <div className={mergeClassNames(hadLogined ? 'hidden' : 'text-gray-800')}>点击登录</div>

            <div className={mergeClassNames(!hadLogined && 'hidden')}>
              <h2 className='mb-1 text-gray-800'>{info.nickName}</h2>
              <p>
                <span className='inline-block text-xs text-gray-400'>LV 1</span>
                <span className='inline-block ml-2 px-1 text-xs text-gray-50 rounded-tl-lg rounded-r-lg bg-red-400'>
                  小萌新
                </span>
              </p>
            </div>
          </section>
        </div>
      </section>

      <SectionTitle>我的收藏</SectionTitle>

      <section className='flex m-2'>
        {groups.map(group => (
          <div key={group.key} style={{ width: '50%' }}>
            {group.list.map(v => (
              <article key={v._id}>
                <section className='rounded-lg overflow-hidden mx-2 mb-4 shadow-md'>
                  <div
                    className='bg-center bg-cover bg-blue-50'
                    style={{ backgroundImage: `url("${v.cover}")`, height: `${v.height}px` }}
                  ></div>
                  <section className='m-2'>
                    {v.content?.split('\n').map(str => (
                      <p key={str} className='mb-1 last:mb-0 text-xs text-gray-600'>
                        {str}
                      </p>
                    ))}
                  </section>

                  <p className='pb-2 px-2'>
                    {!!v.resource?.author?.name && (
                      <span className='inline-block mr-1 text-xs text-gray-400'>{v.resource?.author?.name}</span>
                    )}
                    {!!v.resource?.name && (
                      <span className='inline-block text-xs text-gray-400'>《{v.resource?.name}》</span>
                    )}
                  </p>
                </section>
              </article>
            ))}
          </div>
        ))}
      </section>
    </>
  )
}

export default Mine
