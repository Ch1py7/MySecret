import { Icon } from '@iconify/react'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'

interface HeaderProps {
  setSecretWindow: Dispatch<SetStateAction<boolean>>
}

export const Header: FC<HeaderProps> = ({ setSecretWindow }): ReactElement => {
  return (
    <header className='flex justify-center bg-[#0B090A]'>
      <div className='flex justify-between items-center py-4 text-[#F5F3F4] w-xl'>
        <Icon icon='mi:filter' fontSize={31} />
        <h1 className='text-[28px]'>mysecret</h1>
        <Icon
          onClick={() => setSecretWindow((prev) => !prev)}
          icon='fa6-regular:pen-to-square'
          fontSize={31}
        />
      </div>
    </header>
  )
}
