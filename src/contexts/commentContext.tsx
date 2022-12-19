import { createContext, ReactNode, useContext, useState } from 'react'
import uuid from 'react-uuid'
import { comments as dataComments, currentUser } from '../data/data.json'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type userProps = {
  username: string
}

export type nestedCommentProp = {
  id: string
  content: string
  createdAt: string
  score: number
  replyingTo: string | undefined
  user: userProps
}

export type commentProps = {
  id: string
  content: string
  createdAt: string
  score: number
  user: userProps
  replies: nestedCommentProp[] | []
}

type commentContextProviderProps = {
  children: ReactNode
}

type userReplyProps = {
  [key: string]: boolean
}

type commentContextProps = {
  comments: commentProps[]
  currUser: userProps
  setReplyStatus: (id: string) => void
  userReply: userReplyProps
  voteChange: (id: string, type: 'add' | 'sub') => void
  addComment: (
    id: string,
    type: 'main' | 'nested',
    content: string,
    nestedUsername?: string
  ) => void
  deleteComment: (id: string) => void
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalId: string
  setModalId: React.Dispatch<React.SetStateAction<string>>
  editComment: (id: string, content: string) => void
  setIsEditStatus: (id: string) => void
  isEdit: userReplyProps
}

const CommentContext = createContext({} as commentContextProps)

export const CommentContextProvider = ({
  children
}: commentContextProviderProps) => {
  const [comments, setComments] = useLocalStorage<commentProps[]>(
    'localComment',
    dataComments
  )
  const [currUser, setCurrUser] = useState<userProps>(currentUser)
  const [userReply, setUserReply] = useState<userReplyProps>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalId, setModalId] = useState<string>('')
  const [isEdit, setIsEdit] = useState<userReplyProps>({})

  const setReplyStatus = (id: string) =>
    setUserReply((prev) => ({ ...prev, [id]: true }))

  const setIsEditStatus = (id: string) =>
    setIsEdit((prev) => ({ ...prev, [id]: true }))

  const mathsFnc = (score: number, type: 'add' | 'sub') => {
    if (type === 'add') return score + 1
    else if (type === 'sub') return score - 1
    return score
  }

  const voteChange = (id: string, type: 'add' | 'sub') =>
    setComments((prev) =>
      prev.map((prevItem) => {
        const nestedId = prevItem.replies.find(
          (nestedPrevItem) => nestedPrevItem.id === id
        )
        if (prevItem.id === id) {
          return { ...prevItem, score: mathsFnc(prevItem.score, type) }
        } else if (nestedId) {
          return {
            ...prevItem,
            replies: prevItem.replies.map((nestedScore) =>
              nestedScore.id === id
                ? { ...nestedScore, score: mathsFnc(nestedScore.score, type) }
                : nestedScore
            )
          }
        }
        return prevItem
      })
    )

  const addComment = (
    id: string,
    type: 'main' | 'nested',
    content: string,
    nestedUsername?: string
  ) => {
    if (type === 'nested') setUserReply((prev) => ({ ...prev, [id]: false }))
    if (!content) return
    const newComment = {
      id: uuid(),
      content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        username: currUser.username
      },
      replies: []
    }
    if (type === 'main') setComments((prev) => [...prev, newComment])
    if (type === 'nested') {
      const userNow: commentProps | undefined = comments.find(
        (comm) => comm.id === id
      )
      const userReplies: nestedCommentProp[] = [
        ...userNow!.replies,
        { ...newComment, replyingTo: nestedUsername }
      ]
      const updatedComment: commentProps[] = comments.map((comm) =>
        comm.id === id ? { ...comm, replies: userReplies } : comm
      )
      setComments(updatedComment)
    }
  }

  const deleteComment = (id: string) => {
    const isNotNested = comments.find((comm) => comm.id === id)
    if (isNotNested) {
      setComments((prev) => prev.filter((prevComm) => prevComm.id !== id))
    } else {
      setComments((prev) =>
        prev.map((comm) => ({
          ...comm,
          replies: comm.replies.filter((rep) => rep.id !== id)
        }))
      )
    }
    setIsModalOpen(false)
    setModalId('')
  }

  const editComment = (id: string, content: string) => {
    if (!content) return
    console.log()
    const isNotNested = comments.find((comm) => comm.id === id)
    if (isNotNested) {
      setComments((prev) =>
        prev.map((prevComm) =>
          prevComm.id === id ? { ...prevComm, content } : prevComm
        )
      )
    } else {
      setComments((prev) =>
        prev.map((prevComm) => ({
          ...prevComm,
          replies: prevComm.replies.map((nest) =>
            nest.id === id ? { ...nest, content } : nest
          )
        }))
      )
    }
    setIsEdit((prev) => ({ ...prev, [id]: false }))
  }

  const store = {
    comments,
    currUser,
    setReplyStatus,
    userReply,
    voteChange,
    addComment,
    deleteComment,
    isModalOpen,
    setIsModalOpen,
    modalId,
    setModalId,
    editComment,
    setIsEditStatus,
    isEdit
  }

  return (
    <CommentContext.Provider value={store}>{children}</CommentContext.Provider>
  )
}

export const useCommentContext = () => useContext(CommentContext)
