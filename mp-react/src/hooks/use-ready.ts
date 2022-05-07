import { useEffect, useState } from 'react'

/**
 * @description 监听一个值，变为 true 时触发一次回调
 * @param fn 回调函数
 * @param whenReady 要监听的值
 */
export function useReady(fn: () => void, whenReady: boolean) {
  const [isReady, setReady] = useState(false)
  useEffect(() => {
    if (whenReady && !isReady) {
      setReady(true)
      fn()
    }
  }, [fn, isReady, whenReady])
}
