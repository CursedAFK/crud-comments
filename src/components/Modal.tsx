import { useCommentContext } from '../contexts/commentContext'

type modalProps = {
  id: string
}

const Modal = (props: modalProps) => {
  const { modalId, setModalId, setIsModalOpen, deleteComment } =
    useCommentContext()

  return (
    <aside className='fixedModal'>
      <div className='container'>
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className='btnDiv'>
          <button
            onClick={() => {
              setModalId('')
              setIsModalOpen(false)
            }}
          >
            NO, CANCEL
          </button>
          <button onClick={() => deleteComment(modalId)}>YES, DELETE</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal
