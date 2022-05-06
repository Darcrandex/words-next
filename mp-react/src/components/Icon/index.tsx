/**
 * @name Icon
 * @description 由于无法在小程序中直接引用本地图片，需要使用 Image 组件去承载图片资源
 * @author darcrand
 */

import { Image, ITouchEvent } from '@tarojs/components'

interface IconProps {
  url: string
  size?: number
  className?: string
  style?: React.CSSProperties
  onClick?: (event: ITouchEvent) => void
}

const Icon: React.FC<IconProps> = props => {
  return (
    <>
      <Image
        src={props.url}
        mode='aspectFill'
        className={props.className}
        style={{ width: props.size || 24, height: props.size || 24, ...props.style }}
        onClick={props.onClick}
      />
    </>
  )
}

export default Icon
