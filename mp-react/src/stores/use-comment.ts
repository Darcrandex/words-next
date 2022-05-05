/**
 * @description 句子详情页面，回复框部分的逻辑
 */
import { useMemo } from 'react'
import { atomFamily, useRecoilState } from 'recoil'
import { apiComment } from '@/apis/comment'
import { useUser } from './use-user'

interface UpdateEvent {
  type: 'comment-list' | 'comment-item' | 'reply-list' | 'reply-item' | undefined
  commentId?: string
}

const fnCommentAtom = atomFamily<
  {
    commentId?: string
    to?: string
    targetName?: string
    content: string
    focusState: boolean
    updateEvent?: UpdateEvent
  },
  string
>({
  key: 'comment',
  default: {
    commentId: undefined,
    to: undefined,
    targetName: undefined,
    content: '',
    // 用于交互逻辑，当点击 回复 按钮时，让输入框聚焦
    focusState: false
  }
})

export function useComment(paragraphId: string) {
  const { info } = useUser()

  const [state, setState] = useRecoilState(fnCommentAtom(paragraphId))
  const placeholder = useMemo(() => (state.targetName ? `回复 ${state.targetName}` : '评论一下呗 ╭(●`∀′●)╯'), [
    state.targetName
  ])

  const setFocusState = (focusState: boolean) => setState(curr => ({ ...curr, focusState }))

  const commentToParagraph = () => {
    setState(curr => ({
      ...curr,
      focusState: true,
      commentId: undefined,
      to: undefined,
      targetName: undefined,
      content: ''
    }))
  }

  const replyToComment = (commentId: string, targetName: string) => {
    setState(curr => ({ ...curr, focusState: true, commentId, to: undefined, targetName, content: '' }))
  }

  const replyToUser = (commentId: string, to: string, targetName: string) => {
    setState(curr => ({ ...curr, focusState: true, commentId, to, targetName, content: '' }))
  }

  const updateContent = (content: string) => {
    setState(curr => ({ ...curr, content }))
  }

  const sendComment = async () => {
    const params = {
      paragraphId,
      commentId: state.commentId,
      content: state.content,
      from: info._id || '',
      to: state.to
    }
    await apiComment(params)

    setState({
      commentId: undefined,
      to: undefined,
      targetName: undefined,
      content: '',
      focusState: false,

      // 成功后，通知组件更新
      // 虽然这种方式很奇葩
      updateEvent: {
        type: params.commentId ? 'reply-list' : 'comment-list',
        commentId: params.commentId
      }
    })
  }

  return {
    commentState: { ...state, paragraphId },
    placeholder,
    setFocusState,
    commentToParagraph,
    replyToComment,
    replyToUser,
    updateContent,
    sendComment
  }
}
