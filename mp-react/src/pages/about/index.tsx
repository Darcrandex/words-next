/**
 * @name About
 * @description 关于页面
 * @author darcrand
 */

import { Image } from '@tarojs/components'
import TopHeader from '@/components/TopHeader'
import imgLogo from '@/assets/images/logo.jpg'

const About: React.FC = () => {
  return (
    <>
      <TopHeader>关于</TopHeader>

      <Image src={imgLogo} className='block mx-auto my-4 w-24 h-24 rounded-full bg-gray-100' />

      <p className='m-4 text-gray-600 indent-1'>
        <code className='inline-block font-bold'>Just Words（片语）</code>
        是一款个人开发的小程序。在这里可以每天遇到一句让你耳目一新的句子。希望你喜欢。
      </p>
    </>
  )
}

export default About
