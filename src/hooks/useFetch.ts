import { useCallback, useState, useEffect } from 'react'

const url = import.meta.env.VITE_API_URL

export const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null)

  const getSecrets = useCallback(async () => {
    try {
      const res = await fetch(`${url}api/secrets`)
      const response: T = await res.json()
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getSecrets()
  }, [getSecrets])

  return { data }
}