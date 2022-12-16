import CommentCard from './components/CommentCard'
import Commentinput from './components/Commentinput'
import { useCommentContext } from './contexts/commentContext'

const App = () => {
  const { comments } = useCommentContext()

  return (
    <main>
      <div className='mainComments'>
        {comments.map((comment) => (
          <div className='commentCardDiv' key={comment.id}>
            <CommentCard
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              score={comment.score}
              user={comment.user}
            />
            {comment.replies.length > 0 && (
              <div className='nestedCommentCard'>
                {comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    id={reply.id}
                    score={reply.score}
                    user={reply.user}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='mainInput'>
        <Commentinput />
      </div>
    </main>
  )
}

export default App
