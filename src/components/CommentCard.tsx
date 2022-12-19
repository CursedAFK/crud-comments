import { useCommentContext, userProps } from '../contexts/commentContext'
import amyrobson from '../images/avatars/image-amyrobson.png'
import maxblagun from '../images/avatars/image-maxblagun.png'
import ramsesmiron from '../images/avatars/image-ramsesmiron.png'
import juliusomo from '../images/avatars/image-juliusomo.png'
import deleteIcon from '../images/icon-delete.svg'
import editIcon from '../images/icon-edit.svg'
import replyIcon from '../images/icon-reply.svg'
import plusIcon from '../images/icon-plus.svg'
import minusIcon from '../images/icon-minus.svg'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { FormEvent, useState } from 'react'

type commentCardProps = {
  id: string
  content: string
  createdAt: string
  score: number
  user: userProps
  replyingTo?: string
}

type userPicProps = {
  amyrobson: string
  maxblagun: string
  ramsesmiron: string
  juliusomo: string
  [key: string]: string
}

const CommentCard = (comment: commentCardProps) => {
  const [editContent, setEditContent] = useState<string>(comment.content)

  const {
    currUser,
    setReplyStatus,
    voteChange,
    setIsModalOpen,
    setModalId,
    isEdit,
    setIsEditStatus,
    editComment
  } = useCommentContext()

  const USER_PICS: userPicProps = {
    amyrobson,
    maxblagun,
    ramsesmiron,
    juliusomo
  }

  const getUserPic = (username: string) => {
    const userPic = Object.keys(USER_PICS).find((key) => key === username)
    return USER_PICS[userPic!]
  }

  const getCurrUser = comment.user.username === currUser.username

  const votePH = comment.score < 0

  const getTimePeriod = (time: string) => {
    const data = parseISO(time)
    const timePeriod = formatDistanceToNow(data)
    return timePeriod
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    editComment(comment.id, editContent)
  }

  return (
    <section className='commentCard'>
      <div className='container'>
        <div className='header'>
          <img
            src={getUserPic(comment.user.username)}
            alt={comment.user.username}
          />
          <h2 className='name'>{comment.user.username}</h2>
          {getCurrUser && <p className='currUser'>you</p>}
          <p className='time'>{getTimePeriod(comment.createdAt)} ago</p>
        </div>
        {isEdit[comment.id] === true ? (
          <form onSubmit={handleSubmit} className='contentEdit'>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button type='submit'>UPDATE</button>
          </form>
        ) : (
          <p className='content'>
            {comment.replyingTo && <span>@{comment.replyingTo}</span>}{' '}
            {comment.content}
          </p>
        )}
      </div>
      <div className='btnActions'>
        {getCurrUser ? (
          <>
            <div
              className='btn Delete'
              onClick={() => {
                setModalId(comment.id)
                setIsModalOpen(true)
              }}
            >
              <img src={deleteIcon} alt='deleteIcon' /> Delete
            </div>
            <div
              className='btn Edit'
              onClick={() => setIsEditStatus(comment.id)}
            >
              <img src={editIcon} alt='editIcon' /> Edit
            </div>
          </>
        ) : (
          <div className='btn reply' onClick={() => setReplyStatus(comment.id)}>
            <img src={replyIcon} alt='replyIcon' /> Reply
          </div>
        )}
      </div>
      <div className='votes'>
        <img
          src={plusIcon}
          alt='plusIcon'
          onClick={() => voteChange(comment.id, 'add')}
        />
        <p className={votePH ? 'negative' : 'positive'}>{comment.score}</p>
        <img
          src={minusIcon}
          alt='minusIcon'
          onClick={() => voteChange(comment.id, 'sub')}
        />
      </div>
    </section>
  )
}

export default CommentCard
