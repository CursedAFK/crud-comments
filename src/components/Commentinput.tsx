import { useCommentContext } from '../contexts/commentContext'

const Commentinput = () => {
  const { currUser } = useCommentContext()

  return (
    <form>
      <img src={currUser.image.png} alt={currUser.username} />
      <textarea placeholder='Add a comment...' />
      <button type='submit'>SEND</button>
    </form>
  )
}

export default Commentinput
