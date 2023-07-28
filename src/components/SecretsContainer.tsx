import { useFetch } from 'hooks'
import { FC, ReactElement, useCallback, useState } from 'react'
import { secretsService } from 'services'
import { Secrets } from 'types/secrets'
import { Card } from './Card'
import { Loader } from './Loader'
import { Icon } from '@iconify/react'

export const SecretsContainer: FC = (): ReactElement => {
  const [current, setCurrent] = useState<number>(1)
  const { data: secrets, setData } = useFetch<Secrets[]>(`api/secrets?page=${current}&pageSize=10`)
  const { data: allSecrets } = useFetch<Secrets[]>('api/allsecrets')
  const [loader, setLoader] = useState<boolean>(false)

  const handleNext = useCallback(() => {
    if (!allSecrets) return
    setCurrent((prev) => (prev === allSecrets?.length / allSecrets?.length + 1 ? 0 : prev + 1))
  }, [allSecrets])

  const handlePrev = useCallback(() => {
    if (!allSecrets) return
    setCurrent((prev) => (prev === 0 ? allSecrets?.length / allSecrets?.length + 1 : prev - 1))
  }, [allSecrets])

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

  return (
    <section className={`${secrets ? null : 'flex flex-col justify-center items-center'} bg-[#141113] min-h-[calc(100vh-70px)] py-6`}>
      {secrets ? (
        <>
          {secrets.map((secret, index) => (
            <Card key={index} secret={secret} likeFn={likeFn} dislikeFn={dislikeFn} loader={loader} />
          ))}
          <div className='flex justify-around w-2xl m-auto'>
            <button
              className='flex justify-center items-center h-[2rem] w-[12rem] border-none bg-[#f2508f] rounded-md'
              onClick={handlePrev}
            >
              <Icon icon='ep:arrow-left-bold' fontSize={24} />
            </button>
            <button
              className='flex justify-center items-center h-[2rem] w-[12rem] border-none bg-[#3C8CD4] rounded-md'
              onClick={handleNext}
            >
              <Icon icon='ep:arrow-right-bold' fontSize={24} />
            </button>
          </div>
        </>
      ) : <Loader />}
    </section>
  )
}
