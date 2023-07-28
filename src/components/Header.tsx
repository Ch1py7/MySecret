import { Icon } from '@iconify/react'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'

interface HeaderProps {
  setSecretWindow: Dispatch<SetStateAction<boolean>>
  setFilters: Dispatch<SetStateAction<boolean>>
}

export const Header: FC<HeaderProps> = ({ setSecretWindow, setFilters }): ReactElement => {
  return (
    <header className='flex justify-center bg-[#0B090A]'>
      <div className='flex justify-between items-center py-4 text-[#F5F3F4] w-xl'>
        <button
          onClick={() => setFilters((prev) => !prev)}
          className='bg-transparent border-none'
        >
          <Icon
            icon='mi:filter'
            fontSize={32}
            color='#f5f3f4'
          />
        </button>
        <h1 className='text-[28px]'>mysecret</h1>
        <button
          onClick={() => setSecretWindow((prev) => !prev)}
          className='bg-transparent border-none'
        >
          <Icon
            icon='fa6-regular:pen-to-square'
            fontSize={32}
            color='#f5f3f4'
          />
        </button>
      </div>
    </header>
  )
}
