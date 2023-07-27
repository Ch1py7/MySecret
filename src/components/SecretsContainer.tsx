import { useFetch } from 'hooks'
import { FC, ReactElement, useState } from 'react'
import { secretsService } from 'services'
import { Secrets } from 'types/secrets'
import { Card } from './Card'

export const SecretsContainer: FC = (): ReactElement => {
  const { data, setData } = useFetch<Secrets[]>()
  const [loader, setLoader] = useState<boolean>(false)

  // TODO: Refactor these functions to be more DRY
  const likeFn = async (id: string, secret: Secrets) => {
    try {
      setLoader(true)
      localStorage.getItem(`like-${id}`) === id
        ? (await secretsService.removeLike(id, secret),
        setData((prev) =>
            prev!.map((secret) => {
              if (secret._id === id) secret.likes--
              return secret
            })
        ))
        : (await secretsService.addLike(id, secret),
        setData((prev) =>
            prev!.map((secret) => {
              if (secret._id === id) secret.likes++
              return secret
            })
        ))
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  const dislikeFn = async (id: string, secret: Secrets) => {
    try {
      setLoader(true)
      localStorage.getItem(`dislike-${id}`) === id
        ? (await secretsService.removeDislike(id, secret),
        setData((prev) =>
            prev!.map((secret) => {
              if (secret._id === id) secret.likes++
              return secret
            })
        ))
        : (await secretsService.addDislike(id, secret),
        setData((prev) =>
            prev!.map((secret) => {
              if (secret._id === id) secret.dislikes--
              return secret
            })
        ))
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  if (!data) return <h1>loading</h1>
  return (
    <section className='bg-[#141113] h-[calc(100vh-70px)] py-6'>
      {data.map((secret, index) => (
        <Card key={index} secret={secret} likeFn={likeFn} dislikeFn={dislikeFn} loader={loader} />
      ))}
    </section>
  )
}
