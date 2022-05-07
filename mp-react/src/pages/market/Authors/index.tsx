/**
 * @name Authors
 * @description 作者列表
 * @author darcrand
 */

import { mergeClassNames } from '@/utils'
import { ScrollView } from '@tarojs/components'

export interface AuthorsProps {
  show: boolean
}

const Authors: React.FC<AuthorsProps> = ({ show }) => {
  return (
    <>
      <ScrollView scrollY className={mergeClassNames('h-full', show ? 'visible' : 'hidden invisible')}>
        <h1>作者列表</h1>
      </ScrollView>
    </>
  )
}

export default Authors
