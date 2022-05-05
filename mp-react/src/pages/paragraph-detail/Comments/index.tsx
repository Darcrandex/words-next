/**
 * @name Comments
 * @description 评论列表（1级）
 * @author darcrand
 */

import React, { useCallback, useState } from 'react'
import { useMount, useAsyncEffect } from 'ahooks'
import dayjs from 'dayjs'

import Divider from '@/components/Divider'
import { useComment } from '@/stores/use-comment'
import { apiGetComments, CommentModel } from '@/apis/comment'
import Replies from '../Replies'

// 把维护列表数据的逻辑封装，提供给父组件
export function useCommentEffect({ paragraphId }: { paragraphId: string }) {
  const { commentState } = useComment(paragraphId)

  const [page, setPage] = useState(1)
  const [list, setList] = useState<CommentModel[]>([])
  const [total, setTotal] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  const onRefresherRefresh = useCallback(async () => {
    setRefreshing(true)
    const res = await apiGetComments({ paragraphId })
    setList(res.list)
    setTotal(res.total)
    setPage(1)
    setRefreshing(false)
  }, [paragraphId])

  const onScrollToLower = useCallback(async () => {
    if (list.length < total) {
      setLoading(true)
      const res = await apiGetComments({ paragraphId: paragraphId, page: page + 1 })
      setList(curr => curr.concat(res.list))
      setTotal(res.total)
      setPage(curr => curr + 1)
      setLoading(false)
    }
  }, [list.length, page, paragraphId, total])

  useMount(onRefresherRefresh)

  // 评论后刷新
  useAsyncEffect(async () => {
    if (commentState.updateEvent && commentState.updateEvent.type === 'comment-list') {
      const res = await apiGetComments({ paragraphId })
      setList(res.list)
      setTotal(res.total)
    }
  }, [commentState.updateEvent])

  return { list, total, loading, refreshing, onRefresherRefresh, onScrollToLower }
}

const Comments: React.FC<{
  paragraphId: string
  total: number
  list: CommentModel[]
}> = props => {
  const { replyToComment } = useComment(props.paragraphId)

  return (
    <>
      {props.total > 0 ? (
        props.list.map(v => (
          <section key={v._id} className='flex flex-start m-4'>
            <i
              className='w-10 h-10 rounded-full bg-gray-200 bg-center bg-cover shadow-s'
              style={{ backgroundImage: `url("${v.from.avatarUrl}")` }}
            />

            <div className='flex-1 ml-4'>
              <span className='text-gray-600 text-sm text-theme'>{v.from.nickName}</span>
              <p className='my-1 text-gray-800'>{v.content}</p>
              <p className='flex text-gray-400 text-xs'>
                <span className='mr-2'>{dayjs(v.createdAt).fromNow()}</span>
                <span className='mr-2' onClick={() => replyToComment(v._id, v.from.nickName)}>
                  回复
                </span>
              </p>

              <Replies paragraphId={props.paragraphId} commentId={v._id} />

              <Divider className='pt-2' />
            </div>
          </section>
        ))
      ) : (
        <p className='text-center text-gray-400 text-sm'>沙发还很凉 (=・ω・=)</p>
      )}
    </>
  )
}

export default Comments
