import { FC, ReactNode } from 'react'

export const Loader: FC = (): ReactNode => {
  return (
    <div className='flex items-center'>
      <span className='inline-block w-[5px] h-[30px] bg-[#ffffff7f rounded-[10] animate-scale-up' />
      <span className='inline-block w-[5px] h-[45px] bg-[#ffffff7f] rounded-[10] my-0 mx-[5px] animate-scale-up animate-delay-[.25s]' />
      <span className='inline-block w-[5px] h-[30px] bg-[#ffffff7f] rounded-[10] animate-scale-up animate-delay-[.5s]' />
    </div>
  )
}