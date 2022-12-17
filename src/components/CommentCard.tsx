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

type commentCardProps = {
  id: number
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
  const { currUser } = useCommentContext()

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
          <p className='time'>{comment.createdAt}</p>
        </div>
        <p className='content'>
          {comment.replyingTo && <span>@{comment.replyingTo}</span>}{' '}
          {comment.content}
        </p>
      </div>
      <div className='btnActions'>
        {getCurrUser ? (
          <>
            <div className='btn Delete'>
              <img src={deleteIcon} alt='deleteIcon' /> Delete
            </div>
            <div className='btn Edit'>
              <img src={editIcon} alt='editIcon' /> Edit
            </div>
          </>
        ) : (
          <div className='btn reply'>
            <img src={replyIcon} alt='replyIcon' /> Reply
          </div>
        )}
      </div>
      <div className='votes'>
        <img src={plusIcon} alt='plusIcon' />
        <p className={votePH ? 'negative' : 'positive'}>{comment.score}</p>
        <img src={minusIcon} alt='minusIcon' />
      </div>
    </section>
  )
}

export default CommentCard
