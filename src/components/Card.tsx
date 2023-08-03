import { Icon } from '@iconify/react'
import { FC, ReactElement, useCallback, useMemo, useState } from 'react'
import { Secrets } from 'types/secrets'

interface CardProps {
  secret: Secrets
  likeFn: (id: string, secret: Secrets) => Promise<void>
}

export const Card: FC<CardProps> = ({ secret, likeFn }): ReactElement => {
  const { _id, age, likes, gender, secret: secretText, anonName } = secret
  const count = useMemo(() => likes, [likes])
  const [loader, setLoader] = useState<boolean>(false)

  const handleLikeClick = useCallback(async () => {
    try {
      setLoader(true)
      await likeFn(_id, secret)
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }, [likeFn])

  return (
    <article
      className={`flex flex-col rounded-3 w-2xl ${
        gender === 'man' ? 'border-[#3C8CD4] border-1 border-solid' : gender === 'woman' ? 'border-[#f2508f] border-1 border-solid' : 'border-[#707070] border-1 border-solid'
      } m-auto my-10`}
    >
      <header className={`flex justify-between items-center px-10 ${
        gender === 'man' ? 'bg-[#3C8CD4]' : gender === 'woman' ? 'bg-[#f2508f]' : 'bg-[#b8b8b8]'
      } h-[4em] rounded-rt-2 rounded-lt-2`}>
        <div>
          <h2 className='text-3xl'>{anonName ? anonName : 'Anonymous'}</h2>
          <p className='text-[12px] font-bold'>{age} years</p>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <button disabled={loader} onClick={handleLikeClick} className='flex items-center bg-transparent border-none'>
            <Icon icon={localStorage.getItem(`like-${_id}`) ? 'system-uicons:face-happy' : 'system-uicons:face-neutral' } fontSize={32} />
          </button>
          <p className='w-[2em] text-center'>
            {count}
          </p>
        </div>
      </header>
      <section className='min-h-[2em] px-10 py-6'>
        <p className='text-xl text-[#F5F3F4]'>{secretText}</p>
      </section>
    </article>
  )
}
