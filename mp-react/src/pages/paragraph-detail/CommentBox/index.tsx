/**
 * @name CommentBox
 * @description 评论输入框（同时绑定多个目标）
 * @author darcrand
 */

import React from 'react'
import { Input } from '@tarojs/components'
import { useComment } from '@/stores/use-comment'
import { useSafeArea } from '@/stores/use-safe-area'

export const PADDING_TOP = 10
export const CONTENT_HEIGHT = 32
const contentStyle = { height: CONTENT_HEIGHT, lineHeight: `${CONTENT_HEIGHT}px` }

const CommentBox: React.FC<{ paragraphId: string }> = props => {
  const { safeArea } = useSafeArea()
  const { commentState, placeholder, commentToParagraph, updateContent, sendComment } = useComment(props.paragraphId)

  return (
    <>
      <section
        className='flex items-center pt-2 bg-white shadow-m'
        style={{ paddingTop: PADDING_TOP, paddingBottom: safeArea.safeAreaBottom }}
      >
        <Input
          maxlength={200}
          cursorSpacing={24}
          className='ml-4 mr-2 px-2 w-auto flex-1 rounded bg-gray-50 text-gray-600 text-sm'
          placeholder={placeholder}
          style={contentStyle}
          value={commentState.content}
          onInput={event => updateContent(event.detail.value)}
          onConfirm={sendComment}
        />

        {!!commentState.targetName && (
          <span className='mx-2 px-2 rounded text-sm text-theme ' style={contentStyle} onClick={commentToParagraph}>
            取消
          </span>
        )}

        <span
          className='mr-4 ml-2 px-2 rounded text-sm text-gray-50 bg-theme'
          style={contentStyle}
          onClick={sendComment}
        >
          {commentState.targetName ? '回复' : '评论'}
        </span>
      </section>
    </>
  )
}

export default CommentBox
