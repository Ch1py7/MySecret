import { Icon } from '@iconify/react'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'

interface FilterProps {
  setFilters: Dispatch<SetStateAction<boolean>>
  setTagFilter: Dispatch<SetStateAction<string[]>>
  setAgeFilter: Dispatch<SetStateAction<string>>
  tagFilter: string[]
  ageFilter: string
}

const regex = /^(?:[a-zA-Z0-9]{1,7}(?:,|$)){1,3}$/

export const Filter: FC<FilterProps> = ({
  setFilters,
  setTagFilter,
  setAgeFilter,
  tagFilter,
  ageFilter,
}): ReactElement => {
  return (
    <section className='h-screen w-full absolute bg-[#0B090Aba] backdrop-blur-2 top-0 flex justify-center items-center'>
      <div className='w-xl bg-[#0B090A] h-[21.4em] rounded-xl text-[#F5F3F4] p-5'>
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
        <div className='flex flex-col justify-center items-center border-b-[#F5F3F4] border-b-1 border-b-solid py-6 gap-6'>
          <div>
            <div className='flex justify-center items-center gap-2'>
              <Icon icon='mdi:tag-outline' color='#62add9' fontSize={32} />
              <p>Tags:</p>
            </div>
            <input
              pattern={regex.source}
              className='input w-[20em]'
              type='text'
              placeholder='Tag'
              onChange={(e) => setTagFilter(e.target.value.split(','))}
            />
          </div>
          <div>
            <div className='flex justify-center items-center gap-10'>
              <div className='flex justify-center items-center gap-2'>
                <Icon icon='mdi:man-child' color='#62add9' fontSize={32} />
                <p>Age:</p>
              </div>
              <input min={12} max={99} className='px-2 w-[3.4em] input' value={ageFilter} placeholder='Age' onChange={(e) => setAgeFilter(e.target.value)} />
            </div>
            <input className='w-[20em]' type='range' min={12} max={99} value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} />
          </div>
        </div>
      </div>
    </section>
  )
}
