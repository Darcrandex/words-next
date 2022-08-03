/**
 * @name TopSearch
 * @description 头部搜索栏
 * @author darcrand
 */

import React from 'react'
import { useSafeArea } from '@/stores/use-safe-area'
import { mergeClassNames } from '@/utils'
import Icon from '@/components/Icon'

import iconSearch from '@/assets/icons/icon-search-gray-400.svg'

export const HEADER_BOTTOM = 8

export interface TopSearchProps {
  className?: string
  onClick?: (event: React.MouseEvent) => void
}

export function useSearchBarSize() {
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
        <div style={{ width: safeArea.menuBtnRect.left }}>
          <p
            className='flex items-center bg-gray-100 mx-4 px-2 rounded-full text-xs text-gray-400 box-border'
            style={{ height: safeArea.menuBtnRect.height, lineHeight: `${safeArea.menuBtnRect.height}px` }}
          >
            <Icon url={iconSearch} size={20} />
            <span className='ml-1'>{children}</span>
          </p>
        </div>
      </header>
    </>
  )
}

export default TopSearch
