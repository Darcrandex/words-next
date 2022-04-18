/**
 * @name Collection
 * @description 我的收藏
 * @author darcrand
 */

import React, { useState, useEffect, useMemo } from 'react'
import { apiGetParagraphs, Paragraph } from '@/apis/paragraph'

const Collection: React.FC = () => {
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
      <section className='flex m-2'>
        {groups.map(group => (
          <div key={group.key} style={{ width: '50%' }}>
            {group.list.map(v => (
              <article key={v._id}>
                <section className='rounded-lg overflow-hidden mx-2 mb-4 shadow-a'>
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
        <div className='pt-1'></div>
      </section>
    </>
  )
}

export default Collection
