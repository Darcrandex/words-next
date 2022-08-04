/**
 * @name ListItem
 * @description 搜索结果项
 * @author darcrand
 */

import { Image } from '@tarojs/components'
import { ParagraphModel } from '@/apis/paragraph'
import { navigateToPage } from '@/utils'

interface IProps {
  data: ParagraphModel
}

const ListItem: React.FC<IProps> = ({ data }) => {
  return (
    <>
      <section className='flex m-4 rounded shadow-s' onClick={() => navigateToPage('paragraph', { id: data._id })}>
        <Image
          src={data.cover}
          mode='aspectFill'
          className='h-20 bg-center bg-cover bg-blue-50 rounded-tl rounded-bl'
          style={{ width: '33.33%' }}
        />

        <div className='flex-1 flex flex-col p-2'>
          <p className='mb-1 text-sm text-gray-600 clamp-2'>{data.content}</p>

          <section className='mt-auto text-xs text-gray-400 text-right clamp-1'>
            <span className='inline'>{data.resource?.author?.name ?? '佚名'}</span>
            {!!data.resource?.name && <span className='inline ml-1'>《{data.resource?.name}》</span>}
          </section>
        </div>
      </section>
    </>
  )
}

export default ListItem
