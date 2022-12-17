import { useCommentContext } from '../contexts/commentContext'
import juliusomo from '../images/avatars/image-juliusomo.png'

type commentInputProps = {
  replyType?: string
}

const Commentinput = ({ replyType = 'SEND' }: commentInputProps) => {
  const { currUser } = useCommentContext()

  return (
    <form>
      <img src={juliusomo} alt={currUser.username} />
      <textarea placeholder='Add a comment...' />
      <button type='submit'>{replyType}</button>
    </form>
  )
}

export default Commentinput
