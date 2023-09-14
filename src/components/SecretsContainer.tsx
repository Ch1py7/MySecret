import { Icon } from '@iconify/react'
import { useFetch } from 'hooks'
import { FC, ReactElement, useCallback, useState } from 'react'
import { secretsService } from 'services'
import { Secrets } from 'types/secrets'
import { Card } from './Card'
import { Loader } from './Loader'

export const SecretsContainer: FC = (): ReactElement => {
  const [current, setCurrent] = useState<number>(1)
  const { data: secrets, setData: setSecrets } = useFetch<Secrets[]>(
    `api/v1/secret/getSecrets?page=${current}&pageSize=10`
  )

  const handleNext = useCallback(() => {
    if (!secrets) return
    setCurrent((prev) => (prev === secrets?.length / secrets?.length + 1 ? 0 : prev + 1))
  }, [secrets])

  const handlePrev = useCallback(() => {
    if (!secrets) return
    setCurrent((prev) => (prev === 0 ? secrets?.length / secrets?.length + 1 : prev - 1))
  }, [secrets])

  const likeFn = async (id: string, secret: Secrets) => {
    try {
      localStorage.getItem(`like-${id}`) === id
        ? (await secretsService.removeLike(id, secret),
        setSecrets((prev) =>
            prev!.map((secret) => {
              if (secret._id === id) secret.likes--
              return secret
            })
        ))
        : (await secretsService.addLike(id, secret),
        setSecrets((prev) =>
            prev!.map((secret) => {
              if (secret._id === id) secret.likes++
              return secret
            })
        ))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section
      className={
        `${secrets ? '' : 'flex flex-col justify-center items-center'}
      bg-[#141113] min-h-[calc(100vh-70px)] py-6`
      }
    >
      {secrets ? (
        <>
          {secrets.map((secret) => (
            <Card
              key={secret._id}
              secret={secret}
              likeFn={likeFn}
            />
          ))}
          <div className='flex justify-around w-2xl m-auto'>
            <button
              className='flex justify-center items-center h-[3em] w-[12em] border-none bg-[#f2508f] rounded-md'
              onClick={handlePrev}
              disabled={current === 1}
            >
              <Icon icon='ep:arrow-left-bold' fontSize={24} />
            </button>
            <button
              className='flex justify-center items-center h-[3em] w-[12em] border-none bg-[#3C8CD4] rounded-md'
              onClick={handleNext}
              disabled={secrets.some((secret) => secret._id === import.meta.env.VITE_LATEST_SECRET_ID)}
            >
              <Icon icon='ep:arrow-right-bold' fontSize={24} />
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  )
}
