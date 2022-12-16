import { userProps } from '../contexts/commentContext'

type commentCardProps = {
  id: number
  content: string
  createdAt: string
  score: number
  user: userProps
}

const CommentCard = (comment: commentCardProps) => {
  return (
    <section className='commentCard'>
      <div className='container'>
        <div className='header'>
          <img src={comment.user.image.png} alt={comment.user.username} />
          <h2 className='name'>{comment.user.username}</h2>
          <p className='time'>{comment.createdAt}</p>
        </div>
      </div>
    </section>
  )
}

export default CommentCard
