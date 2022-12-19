import { FormEvent, useState } from 'react'
import { useCommentContext } from '../contexts/commentContext'
import juliusomo from '../images/avatars/image-juliusomo.png'

type commentInputProps = {
  replyType?: string
  id: string
  type: 'main' | 'nested'
  nestedUsername?: string
}

const Commentinput = ({
  replyType = 'SEND',
  id,
  type,
  nestedUsername
}: commentInputProps) => {
  const [content, setContent] = useState<string>('')

  const { currUser, addComment } = useCommentContext()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addComment(id, type, content, nestedUsername)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={juliusomo} alt={currUser.username} />
      <textarea
        placeholder='Add a comment...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type='submit'>{replyType}</button>
    </form>
  )
}

export default Commentinput
