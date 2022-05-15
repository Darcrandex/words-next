import { useCallback, useState } from 'react'

export interface UseScrollStatusOptions {
  onRefreshing?: () => Promise<unknown>
  onLoadMore?: () => Promise<unknown>
}

export function useScrollStatus(options?: UseScrollStatusOptions) {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  const onRefresherRefresh = useCallback(async () => {
    setRefreshing(true)
    await options?.onRefreshing?.()
    setRefreshing(false)
  }, [options])

  const onScrollToLower = useCallback(async () => {
    setLoading(true)
    await options?.onLoadMore?.()
    setLoading(false)
  }, [options])

  return { refreshing, loading, onRefresherRefresh, onScrollToLower }
}
