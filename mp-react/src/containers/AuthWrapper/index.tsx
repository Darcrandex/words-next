/**
 * @name AuthWrapper
 * @description 用于拦截未登录时的事件
 * @author darcrand
 */

import React, { useCallback } from 'react'
import { useUser } from '@/stores/use-user'

const AuthWrapper: React.FC<{ onClick?: React.MouseEventHandler<HTMLElement> | undefined; [key: string]: unknown }> = ({
  children,
  onClick,
  ...props
}) => {
  const { hadLogined, signUp } = useUser()

  const handleClick = useCallback(
    e => {
      if (typeof onClick === 'function') {
        // 判断是否登录，如果未登录，弹出授权登录提示框
        if (hadLogined) {
          onClick(e)
        } else {
          signUp()
        }
      }
    },
    [onClick, hadLogined, signUp]
  )

  return (
    <>
      <section onClick={handleClick} {...props}>
        {children}
      </section>
    </>
  )
}

export default AuthWrapper
