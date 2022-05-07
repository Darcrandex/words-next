/**
 * @name Tags
 * @description 标签列表
 * @author darcrand
 */

import { mergeClassNames } from '@/utils'
import { ScrollView } from '@tarojs/components'

export interface TagsProps {
  show: boolean
}

const Tags: React.FC<TagsProps> = ({ show }) => {
  return (
    <>
      <ScrollView scrollY className={mergeClassNames('h-full', show ? 'visible' : 'hidden invisible')}>
        <h1>标签列表</h1>
      </ScrollView>
    </>
  )
}

export default Tags
