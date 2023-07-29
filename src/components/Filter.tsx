import { Icon } from '@iconify/react'
import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react'

interface FilterProps {
  setFilters: Dispatch<SetStateAction<boolean>>
  setTagFilter: Dispatch<SetStateAction<string>>
  setAgeFilter: Dispatch<SetStateAction<number | string>>
}

const regex = /^(?:[a-zA-Z0-9]{1,7}(?:,|$)){1,3}$/

export const Filter: FC<FilterProps> = ({
  setFilters,
  setTagFilter,
  setAgeFilter,
}): ReactElement => {
  const [tag, setTag] = useState<string>('')
  const [age, setAge] = useState<number | string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTagFilter(tag)
    setAgeFilter(age)
    setFilters((prev) => !prev)
  }
  return (
    <section className='h-screen w-full absolute bg-[#0B090Aba] backdrop-blur-2 top-0 flex justify-center items-center'>
      <div className='w-xl bg-[#0B090A] h-[22.8em] rounded-xl text-[#F5F3F4] p-5'>
        <div className='relative flex justify-center items-center text-[#F5F3F4] gap-5 border-b-[#F5F3F4] border-b-1 border-b-solid pb-4'>
          <Icon icon='mdi:filter' color='#ff7b7b' fontSize={32} />
          <h3 className='text-3xl'>Filters </h3>
          <button
            className='absolute border-none bg-transparent right-2'
            onClick={() => setFilters((prev) => !prev)}
          >
            <Icon icon='ph:x-bold' color='red' fontSize={32} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center py-6 gap-8'>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <Icon icon='mdi:tag-outline' color='#62add9' fontSize={32} />
              <p>Tags:</p>
            </div>
            <input
              pattern={regex.source}
              className='input w-[20em]'
              type='text'
              placeholder='Tag'
              value={tag}
              onChange={(e) => setTag(e.target.value.toString())}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-center items-center gap-10'>
              <div className='flex justify-center items-center gap-2'>
                <Icon icon='mdi:man-child' color='#62add9' fontSize={32} />
                <p>Age:</p>
              </div>
              <input
                type='number'
                min={12}
                max={99}
                placeholder='Age'
                className='px-2 w-[3.4em] input'
                value={age}
                onChange={(e) => setAge(e.target.value as unknown as number)}
              />
            </div>
            <input className='w-[20em]' type='range' min={12} max={99} value={age} onChange={(e) => setAge(e.target.value as unknown as number)} />
          </div>
          <div className='flex w-full justify-center pt-6 gap-4 border-t-1 border-t-[#F5F3F4] border-t-solid'>
            <button className='h-[3em] w-[8em] rounded-2 border-none bg-[#f25060]'>
              Clear Filters
            </button>
            <button type='submit' className='h-[3em] w-[8em] rounded-2 border-none bg-[#3C8CD4]'>
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
