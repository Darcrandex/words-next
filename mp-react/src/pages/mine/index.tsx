/**
 * @name Mine
 * @description 我的（个人中心）
 * @author darcrand
 */

import { Image } from '@tarojs/components'
import BottomTabNavs from '@/containers/BottomTabNavs'
import Icon from '@/components/Icon'
import { useUser } from '@/stores/use-user'

import iconMedal from '@/assets/icons/icon-medal.svg'
import iconIdea from '@/assets/icons/icon-idea.svg'
import iconArrowRight from '@/assets/icons/icon-arrow-right.svg'
import iconCollection from '@/assets/icons/icon-collection-theme.svg'
import iconAbout from '@/assets/icons/icon-about-theme.svg'
import iconSetting from '@/assets/icons/icon-setting-theme.svg'

import './style.less'

const Mine: React.FC = () => {
  const { info, hadLogined, signUp } = useUser()

  return (
    <>
      <section className='flex items-center m-2 p-2'>
        <i
          className='w-18 h-18 rounded-full bg-gray-200 bg-center bg-cover shadow-a'
          style={{ backgroundImage: `url("${info.avatarUrl}")` }}
        />
        <div className='ml-4'>
          <span className='text-2xl text-gray-800'>{info.nickName}</span>
          <span className='inline-block px-2 bg-theme text-white text-xs rounded-full rounded-tl-none'>小萌新</span>
        </div>
      </section>

      <section className='flex m-2'>
        <div className='flex items-center flex-1 m-2 p-4 rounded-lg shadow-a bg-pink-50'>
          <Image mode='aspectFill' src={iconMedal} className='w-10 h-10 mr-2' />
          <span className='text-gray-800'>我的勋章</span>
        </div>
        <div className='flex items-center flex-1 m-2 p-4 rounded-lg shadow-a bg-teal-50'>
          <Image mode='aspectFill' src={iconIdea} className='w-10 h-10 mr-2' />
          <span className='text-gray-800'>我的片语</span>
        </div>
      </section>

      <section className='m-4 p-2 rounded-lg shadow-a bg-white'>
        <div className='flex items-center mx-2 py-2 link-item'>
          <Icon url={iconCollection} size={24} />
          <span className='ml-2 mr-auto text-gray-800'>我的收藏</span>
          <Icon url={iconArrowRight} size={16} />
        </div>
        <div className='flex items-center mx-2 py-2 link-item'>
          <Icon url={iconAbout} size={24} />
          <span className='ml-2 mr-auto text-gray-800'>关于</span>
          <Icon url={iconArrowRight} size={16} />
        </div>
        <div className='flex items-center mx-2 py-2'>
          <Icon url={iconSetting} size={24} />
          <span className='ml-2 mr-auto text-gray-800'>设置</span>
          <Icon url={iconArrowRight} size={16} />
        </div>
      </section>

      <BottomTabNavs />
    </>
  )
}

export default Mine
