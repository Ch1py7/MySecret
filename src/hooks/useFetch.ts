import { useCallback, useEffect, useState } from 'react'

const url = import.meta.env.VITE_API_URL

export const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)

  const getSecrets = useCallback(async () => {
    try {
      const res = await fetch(`${url}${endpoint}`)
      const response: T = await res.json()
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }, [endpoint])

  useEffect(() => {
    getSecrets()
  }, [getSecrets, endpoint])

  return { data, setData }
}
