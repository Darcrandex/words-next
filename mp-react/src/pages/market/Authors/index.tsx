/**
 * @name Authors
 * @description 作者列表
 * @author darcrand
 */

import { useCallback, useState } from 'react'
import { ScrollView } from '@tarojs/components'
import { mergeClassNames, navigateToPage } from '@/utils'
import { useReadyEffect } from '@/hooks/use-ready'
import { apiGetAuthors, AuthorModel } from '@/apis/author'

export interface AuthorsProps {
  show: boolean
}

const Authors: React.FC<AuthorsProps> = ({ show }) => {
  const [list, setList] = useState<AuthorModel[]>([])
  const [total, setTotal] = useState(0)

  const onInit = useCallback(async () => {
    const res = await apiGetAuthors()
    setList(res.list)
    setTotal(res.total)
  }, [])

  useReadyEffect(onInit, show)

  return (
    <>
      <ScrollView scrollY className={mergeClassNames('h-full', show ? 'visible' : 'hidden invisible')}>
        <h1>作者列表</h1>
        <ul>
          {list.map(v => (
            <li key={v._id} onClick={() => navigateToPage('author', { id: v._id })}>
              {v.name}
            </li>
          ))}
        </ul>
      </ScrollView>
    </>
  )
}

export default Authors
