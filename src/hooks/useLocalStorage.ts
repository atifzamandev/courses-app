import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [stateLSValue, setStateLSValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error getting localStorage values:', key, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      if (stateLSValue === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(stateLSValue))
      }
    } catch (error) {
      console.error('Error setting localStorage values:', key, error)
    }
  }, [key, stateLSValue])

  const setValue = (value: T) => {
    setStateLSValue(value)
  }

  return [stateLSValue, setValue]
}

export default useLocalStorage
