/**
 * @name TopSearch
 * @description 头部搜索栏
 * @author darcrand
 */

import { useSafeArea } from '@/stores/use-safe-area'
import { mergeClassNames } from '@/utils'
import React from 'react'

export const HEADER_BOTTOM = 8

export interface TopSearchProps {
  className?: string
  onClick?: (event: React.MouseEvent) => void
}

export function useSearchBaSize() {
  const { safeArea } = useSafeArea()
  return {
    height: safeArea.menuBtnRect.top + safeArea.menuBtnRect.height + HEADER_BOTTOM
  }
}

const TopSearch: React.FC<TopSearchProps> = ({ children = '落叶，诉说着故事。。。', className, onClick }) => {
  const { safeArea } = useSafeArea()

  return (
    <>
      <header
        className={mergeClassNames('flex items-end bg-white transition', className)}
        style={{ paddingTop: safeArea.menuBtnRect.top, paddingBottom: HEADER_BOTTOM }}
        onClick={onClick}
      >
        <div style={{ width: safeArea.menuBtnRect.left, height: safeArea.menuBtnRect.height }}>
          <p className='bg-gray-100 mx-4 px-4 py-2 rounded-full text-xs text-gray-400 box-border'>{children}</p>
        </div>
      </header>
    </>
  )
}

export default TopSearch
