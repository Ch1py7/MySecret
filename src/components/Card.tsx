import { Icon } from '@iconify/react'
import { FC, ReactElement, useCallback, useMemo } from 'react'
import { Secrets } from 'types/secrets'

interface CardProps {
  secret: Secrets
  likeFn: (id: string, secret: Secrets) => Promise<void>
  dislikeFn: (id: string, secret: Secrets) => Promise<void>
  loader: boolean
}

export const Card: FC<CardProps> = ({ secret, likeFn, dislikeFn, loader }): ReactElement => {
  const { _id, age, tags, likes, dislikes, gender, secret: secretText, country } = secret
  const count = useMemo(() => likes + dislikes, [likes, dislikes])

  const handleLikeClick = useCallback(async () => {
    await likeFn(_id, secret)
  }, [likeFn])

  const handleDislikeClick = useCallback(async () => {
    await dislikeFn(_id, secret)
  }, [dislikeFn])

  return (
    <article
      className={`flex flex-col gap-4 rounded-3 py-4 w-2xl ${
        gender === 'man' ? 'bg-[#3C8CD4]' : 'bg-[#f2508f]'
      } m-auto text-black relative mb-8`}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between border-b-solid pb-2 pl-8 pr-16 border-b-black border-b-1'>
          <div className='flex justify-start items-center'>
            {gender === 'man' ? (
              <Icon icon='material-symbols:man' className='text-5 text-black' />
            ) : (
              <Icon icon='material-symbols:woman' className='text-5 text-black' />
            )}
            <p>
              <span className='font-600'>{age}</span> years
            </p>
          </div>
          <p>#{_id}</p>
          <div className='flex gap-2'>
            <button
              disabled={loader}
              onClick={handleLikeClick}
              className='flex bg-transparent border-none flex justify-center items-center'
            >
              <Icon icon='ri:emotion-happy-line' className='text-6 text-black' />
            </button>
            <button
              disabled={loader}
              onClick={handleDislikeClick}
              className='flex gap-2 bg-transparent border-none flex justify-center items-center'
            >
              <Icon icon='ri:emotion-sad-line' className='text-6 text-black' />
            </button>
            <p className='text-black text-center'>{count}</p>
          </div>
        </div>
        <p className='pl-8 pr-16'>{secretText}</p>
        <div className='flex justify-between items-center pl-8 pr-16'>
          <ul className='flex gap-4'>
            {tags.map((tag, index) => (
              <li
                key={index}
                className='border-black border-solid border-1 px-6 py-1 rounded-full duration-200 hover:bg-[#effbf3] hover:text-black'
              >
                {tag}
              </li>
            ))}
          </ul>
          <Icon icon={`emojione:flag-for-${country}`} className='text-8' />
        </div>
      </div>
    </article>
  )
}
