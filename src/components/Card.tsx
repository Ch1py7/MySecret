import { Icon } from '@iconify/react'
import { FC, ReactElement } from 'react'
import { Secrets } from 'types/secrets'

interface CardProps {
  secrets: Secrets
}

export const Card: FC<CardProps> = ({ secrets }): ReactElement => {
  return (
    <article
      className={`flex flex-col gap-4 rounded-3 py-4 w-2xl ${
        secrets.genre === 'man' ? 'bg-[#3C8CD4]' : 'bg-[#f2508f]'
      } m-auto px-16 text-black relative mb-8`}
    >
      <div className='flex justify-between'>
        <div className='flex justify-start items-center'>
          {secrets.genre === 'man' ? (
            <Icon icon='material-symbols:man' className='text-5 text-black' />
          ) : (
            <Icon icon='material-symbols:woman' className='text-5 text-black' />
          )}
          <p>
            <span className='font-600'>{secrets.age}</span> years
          </p>
        </div>
        <p>#{secrets.id}</p>
      </div>
      <p>{secrets.secret}</p>
      <div className='flex justify-between items-center'>
        <ul className='flex gap-4'>
          {secrets.tags.map((tag, index) => (
            <li
              key={index}
              className='border-black border-solid border-1 px-6 py-1 rounded-full duration-200 hover:bg-[#effbf3] hover:text-black'
            >
              {tag}
            </li>
          ))}
        </ul>
        <Icon icon={`emojione:flag-for-${secrets.country}`} className='text-8' />
      </div>
      <div className='absolute [transform:translate(-50%,-50%)] top-50% left-8 flex flex-col'>
        <Icon icon='ri:emotion-unhappy-line' className='text-6 text-black' />
        <p className='text-black'>{secrets.dislikes}</p>
      </div>
      <div className='absolute [transform:translate(-50%,-50%)] top-50% right-2 flex flex-col'>
        <Icon icon='ri:emotion-happy-line' className=' text-6 text-black' />
        <p className='text-black'>{secrets.likes}</p>
      </div>
    </article>
  )
}
