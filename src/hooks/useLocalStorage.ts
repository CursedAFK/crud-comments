import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialState: T) => {
  const [value, setValue] = useState<T>(() => {
    const localData = localStorage.getItem(key)
    if (!localData) {
      return initialState
    } else {
      return JSON.parse(localData)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}
