import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CommentContextProvider } from './contexts/commentContext'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CommentContextProvider>
      <App />
    </CommentContextProvider>
  </React.StrictMode>
)
