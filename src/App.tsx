import React from 'react'
import CommentCard from './components/CommentCard'
import Commentinput from './components/Commentinput'
import { useCommentContext } from './contexts/commentContext'

const App = () => {
  const { comments, currUser } = useCommentContext()

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
            {comment.user.username !== currUser.username && (
              <div className='commentReplyDiv mainReplyDiv'>
                <Commentinput replyType='REPLY' />
              </div>
            )}
            {comment.replies.length > 0 && (
              <div className='nestedCommentCard'>
                {comment.replies.map((reply) => (
                  <React.Fragment key={reply.id}>
                    <CommentCard
                      content={reply.content}
                      createdAt={reply.createdAt}
                      id={reply.id}
                      score={reply.score}
                      user={reply.user}
                      replyingTo={reply.replyingTo}
                    />
                    {reply.user.username !== currUser.username && (
                      <div className='commentReplyDiv'>
                        <Commentinput replyType='REPLY' />
                      </div>
                    )}
                  </React.Fragment>
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
