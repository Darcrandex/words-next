/**
 * @name Resources
 * @description 作品列表
 * @author darcrand
 */

import { ScrollView } from '@tarojs/components'
import { mergeClassNames } from '@/utils'
import { useReadyEffect } from '@/hooks/use-ready'
import { useCallback } from 'react'

export interface ResourcesProps {
  show: boolean
  categoryId: string
}

const Resources: React.FC<ResourcesProps> = ({ show, categoryId }) => {
  const onInit = useCallback(() => {
    console.log('inited ok')
  }, [])

  useReadyEffect(onInit, show)

  return (
    <>
      <ScrollView scrollY className={mergeClassNames('h-full', show ? 'visible' : 'hidden invisible')}>
        <h1>资源列表</h1>
        <p>id {categoryId}</p>
      </ScrollView>
    </>
  )
}

export default Resources
