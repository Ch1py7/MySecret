import { Icon } from '@iconify/react'
import { Secret } from 'domain/secret/Secret'
import { SecretEntity } from 'domain/types/Secret'
import { Dispatch, FC, FormEvent, ReactElement, SetStateAction, useCallback, useState } from 'react'

interface NewSecretProps {
  setSecretWindow: Dispatch<SetStateAction<boolean>>
}

const url = `${import.meta.env.VITE_API_URL}api/insert`

export const NewSecret: FC<NewSecretProps> = ({ setSecretWindow }): ReactElement => {
  const [data, setData] = useState<SecretEntity>({ age: 0, anonName: '', likes: 0, secret: '', gender: 'man' })
  
  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const requestBody = new Secret(data).getDataForRequest()
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setSecretWindow((prev) => !prev)
      location.reload()
    }
  }, [data])

  return (
    <section className='h-screen w-full absolute bg-[#0B090Aba] backdrop-blur-2 top-0 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='w-2xl bg-[#0B090A] h-[31em] rounded-xl text-[#F5F3F4] p-10 flex flex-col gap-5'
      >
        <div className='flex justify-between items-center border-1 border-b-[#F5F3F4] border-b-solid pb-5'>
          <p className='text-3xl'>💡 What secret would you tell us?</p>
          <button
            className='border-none bg-transparent'
            onClick={() => setSecretWindow((prev) => !prev)}
          >
            <Icon
              icon='ph:x-bold'
              color='red'
              fontSize={32}
            />
          </button>
        </div>
        <div className='font-600 border-1 pb-5 border-b-[#F5F3F4] border-b-solid'>
          <p className='inline text-xl'>I am </p>
          <input
            required
            className='input text-[1em]'
            max={99}
            min={12}
            type='number'
            placeholder='age'
            onChange={(e) => setData((prev) => ({ ...prev, age: Number(e.target.value)}))}
          />
          <p className='inline text-xl'> years old and I am a </p>
          <select
            required
            className='input text-[1em]'
            onChange={(e) => setData((prev) => ({ ...prev, gender: e.target.value === 'man' ? 'man' : 'woman'}))}
          >
            <option defaultValue='gender' className='hidden'>
              gender
            </option>
            <option value='man'>man</option>
            <option value='woman'>woman</option>
          </select>
        </div>
        <div className='flex flex-col gap-5'>
          <textarea
            required
            maxLength={420}
            className='w-full h-[12em] text-[18px] rounded-xl border-none bg-[#181818] text-[#F5F3F4] px-4 py-3 resize-none'
            onChange={(e) => setData((prev) => ({ ...prev, secret: e.target.value}))}
          />
          <div className='flex justify-between'>
            <button
              type='submit'
              className='flex justify-center items-center border-none rounded-md w-[4em] h-[2.8em] bg-blue-5 duration-300 hover:bg-blue-7'
            >
              <Icon icon='tabler:send' fontSize={24} />
            </button>
            <input
              required
              className='input px-5 w-[15em] text-[1em]'
              max={99}
              min={12}
              type='number'
              placeholder='anonymous name (optional)'
              onChange={(e) => setData((prev) => ({ ...prev, age: Number(e.target.value)}))}
            />
          </div>
        </div>
      </form>
    </section>
  )
}
