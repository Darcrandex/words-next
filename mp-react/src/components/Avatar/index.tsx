/**
 * @name Avatar
 * @description 头像
 * @author darcrand
 */

import { mergeClassNames } from '@/utils'

export interface AvatarProps {
  src?: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = props => {
  const w = props.className && /\sw-[0-9]+\s/g.test(props.className) ? false : 'w-14'
  const h = props.className && /\sh-[0-9]+\s/g.test(props.className) ? false : 'h-14'

  return (
    <>
      <div
        className={mergeClassNames('bg-center bg-cover bg-gray-200 rounded', w, h, props.className)}
        style={{
          backgroundImage: `url('${props.src ||
            'https://img.win3000.com/m00/4a/e0/c7eb3c8ce58ef088e11877ca54e9ed2a.jpg'}')`
        }}
      ></div>
    </>
  )
}

export default Avatar
