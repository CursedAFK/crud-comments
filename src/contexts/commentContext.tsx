import { createContext, ReactNode, useContext, useState } from 'react'
import { comments as dataComments, currentUser } from '../data/data.json'
import { useLocalStorage } from '../hooks/useLocalStorage'

type userImagesProps = {
  png: string
  webp: string
}

export type userProps = {
  image: userImagesProps
  username: string
}

type nestedCommentProp = {
  id: number
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: userProps
}

type commentProps = {
  id: number
  content: string
  createdAt: string
  score: number
  user: userProps
  replies: nestedCommentProp[]
}

type commentContextProps = {
  comments: commentProps[]
  currUser: userProps
}

type commentContextProviderProps = {
  children: ReactNode
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

  const store = {
    comments,
    currUser
  }

  return (
    <CommentContext.Provider value={store}>{children}</CommentContext.Provider>
  )
}

export const useCommentContext = () => useContext(CommentContext)
