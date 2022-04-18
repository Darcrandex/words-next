/**
 * @name Icon
 * @description 由于无法在小程序中直接引用本地图片，需要使用 Image 组件去承载图片资源
 * @author darcrand
 */

import { Image } from '@tarojs/components'

interface IconProps {
  url: string
  size?: number
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = props => {
  return (
    <>
      <Image
        src={props.url}
        mode='aspectFill'
        className={props.className}
        style={{ width: props.size, height: props.size, ...props.style }}
      />
    </>
  )
}

export default Icon
