/**
 * @name SectionTitle
 * @description 区块标题
 * @author darcrand
 */

import React from 'react'
import classNames from 'classnames'

const SectionTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, className, ...props }) => {
  return (
    <h3 className={classNames('flex items-center m-4', className)} {...props}>
      <i className='w-1 h-4 bg-red-400 mr-2 rounded-tr rounded-bl'></i>
      <span className='text-gray-800'>{children}</span>
    </h3>
  )
}

export default SectionTitle
