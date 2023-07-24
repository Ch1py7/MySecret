import { Icon } from '@iconify/react'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'

interface NewSecretProps {
  setSecretWindow: Dispatch<SetStateAction<boolean>>
}

export const NewSecret: FC<NewSecretProps> = ({ setSecretWindow }): ReactElement => {
  return (
    <section className='h-screen w-full absolute bg-[#0B090Aba] backdrop-blur-2 top-0 flex justify-center items-center'>
      <form className='w-xl bg-[#0B090A] h-[21.4em] rounded-xl text-[#F5F3F4] p-5'>
        <div className='flex pb-2 justify-between items-center pr-2 border-1 border-b-[#F5F3F4] border-b-solid'>
          <p className='text-3xl'>What secret would you tell us?</p>
          <Icon
            onClick={() => setSecretWindow((prev) => !prev)}
            icon='ph:x-bold'
            color='red'
            fontSize={24}
          />
        </div>
        <div className='font-600 pt-4 border-1 pb-4 border-b-[#F5F3F4] border-b-solid'>
          <p className='inline'>I am </p>
          <input
            className='w-7 rounded-md border-none text-center'
            max={99}
            min={12}
            type='number'
            placeholder='age'
          />
          <p className='inline'> years old and I am a </p>
          <select className='rounded-md border-none'>
            <option selected className='hidden'>
              gender
            </option>
            <option value='man'>man</option>
            <option value='woman'>woman</option>
          </select>
        </div>
        <textarea
          maxLength={420}
          className='w-full h-[10rem] text-[18px] rounded-xl border-none mt-5 bg-[#181818] text-[#F5F3F4] px-2 py-1 resize-none'
        />
        <button type='submit' className='border-none rounded-md px-2 py-1 bg-[#8b8b8b] mt-1'>
          Send
        </button>
      </form>
    </section>
  )
}
