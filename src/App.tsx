import React from 'react'
import CommentCard from './components/CommentCard'
import Commentinput from './components/Commentinput'
import Modal from './components/Modal'
import { useCommentContext } from './contexts/commentContext'

const App = () => {
  const { comments, currUser, userReply, isModalOpen, modalId } =
    useCommentContext()

  return (
    <main>
      {isModalOpen && <Modal id={modalId} />}
      <div className='mainComments'>
        {comments
          .slice()
          .sort((a, b) => b.score - a.score)
          .map((comment) => (
            <div className='commentCardDiv' key={comment.id}>
              <CommentCard
                id={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                user={comment.user}
              />
              {comment.user.username !== currUser.username &&
                userReply[comment.id] === true && (
                  <div className='commentReplyDiv mainReplyDiv'>
                    <Commentinput
                      replyType='REPLY'
                      type='nested'
                      id={comment.id}
                      nestedUsername={comment.user.username}
                    />
                  </div>
                )}
              {comment.replies.length > 0 && (
                <div className='nestedCommentCard'>
                  {comment.replies
                    .slice()
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .map((reply) => (
                      <React.Fragment key={reply.id}>
                        <CommentCard
                          content={reply.content}
                          createdAt={reply.createdAt}
                          id={reply.id}
                          score={reply.score}
                          user={reply.user}
                          replyingTo={reply.replyingTo}
                        />
                        {reply.user.username !== currUser.username &&
                          userReply[reply.id] === true && (
                            <div className='commentReplyDiv'>
                              <Commentinput
                                replyType='REPLY'
                                id={comment.id}
                                type='nested'
                                nestedUsername={reply.user.username}
                              />
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
        <Commentinput id={currUser.username} type='main' />
      </div>
    </main>
  )
}

export default App
