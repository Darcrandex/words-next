/**
 * @name Replies
 * @description 评论回复列表（2,3级）
 * @author darcrand
 */

import React, { useCallback, useState } from 'react'
import { useAsyncEffect, useMount } from 'ahooks'
import dayjs from 'dayjs'

import { useComment } from '@/stores/use-comment'
import { apiGetComments, CommentModel } from '@/apis/comment'

const Replies: React.FC<{ paragraphId: string; commentId: string }> = props => {
  const { commentState, replyToUser } = useComment(props.paragraphId)
  const [list, setList] = useState<CommentModel[]>([])
  const [total, setTotal] = useState(0)
  useMount(async () => {
    // 初始化时，只获取 3 条记录
    const res = await apiGetComments({ ...props, size: 3 })
    setList(res.list)
    setTotal(res.total)
  })

  // 回复后刷新
  useAsyncEffect(async () => {
    if (
      commentState.updateEvent &&
      commentState.updateEvent.type === 'reply-list' &&
      commentState.updateEvent.commentId === props.commentId
    ) {
      const res = await apiGetComments(props)
      setList(res.list)
      setTotal(res.total)
    }
  }, [commentState.updateEvent])

  // 为了方便处理，直接获取剩余的所有回复
  // 估计不会超过 1000
  const getAllReplys = useCallback(async () => {
    const res = await apiGetComments({ ...props, size: 1000 })
    setList(res.list)
    setTotal(res.total)
  }, [props])

  return (
    <>
      {total > 0 && (
        <section className='mt-4'>
          {list.map(v => (
            <div key={v._id} className='flex flex-start my-2'>
              <i
                className='w-8 h-8 rounded-full bg-gray-200 bg-center bg-cover shadow-s'
                style={{ backgroundImage: `url("${v.from.avatarUrl}")` }}
              />

              <div className='ml-2'>
                <p className='my-1 text-sm'>
                  <span className='inline text-gray-600'>{v.from.nickName}</span>
                  {!!v.to && (
                    <>
                      <span className='inline mx-1 text-gray-800'>回复</span>
                      <span className='inline text-theme'>{v.to.nickName}</span>
                    </>
                  )}
                  <span className='my-1 text-gray-800'>{v.content}</span>
                </p>

                <p className='flex text-gray-400 text-xs'>
                  <span className='mr-2'>{dayjs(v.createdAt).fromNow()}</span>
                  <span
                    className='mr-2'
                    onClick={() => replyToUser(props.commentId, v.from._id || '', v.from.nickName)}
                  >
                    回复
                  </span>
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {list.length < total && (
        <p className='mt-4 text-sm text-theme opacity-80' onClick={getAllReplys}>
          点击查看全部回复
        </p>
      )}
    </>
  )
}

export default Replies
