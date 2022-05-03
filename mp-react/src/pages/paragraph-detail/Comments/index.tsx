/**
 * @name Comments
 * @description 评论列表（1级）
 * @author darcrand
 */

import React, { useState } from 'react'
import { useMount, useAsyncEffect } from 'ahooks'
import dayjs from 'dayjs'

import Divider from '@/components/Divider'
import { useComment } from '@/stores/use-comment'
import { apiGetComments, CommentModel } from '@/apis/comment'
import Replies from '../Replies'

const Comments: React.FC<{ paragraphId: string }> = props => {
  const { commentState, replyToComment } = useComment(props.paragraphId)
  const [list, setList] = useState<CommentModel[]>([])
  const [total, setTotal] = useState(0)

  useMount(async () => {
    const res = await apiGetComments(props)
    setList(res.list)
    setTotal(res.total)
  })

  useAsyncEffect(async () => {
    if (commentState.updateEvent && commentState.updateEvent.type === 'comment-list') {
      const res = await apiGetComments(props)
      setList(res.list)
      setTotal(res.total)
    }
  }, [commentState.updateEvent])

  return (
    <>
      {total > 0 ? (
        list.map(v => (
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
                <span className='mr-2'>333</span>
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
