/**
 * @name Empty
 * @description 空提示
 * @author darcrand
 */

import React from 'react'

interface IProps {
  height?: string | number
}

const Empty: React.FC<IProps> = props => {
  return (
    <div
      style={{ height: props.height || 300 }}
      className='flex items-center justify-center w-full text-center text-gray-400'
    >
      {props.children || <span>没有数据 (´･_･`)</span>}
    </div>
  )
}

export default Empty
