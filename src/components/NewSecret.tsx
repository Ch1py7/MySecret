import { Icon } from '@iconify/react'
import { Secret } from 'domain/secret/Secret'
import { SecretEntity } from 'domain/types/Secret'
import { Dispatch, FC, FormEvent, ReactElement, SetStateAction, useCallback, useState } from 'react'

interface NewSecretProps {
  setSecretWindow: Dispatch<SetStateAction<boolean>>
}

const url = `${import.meta.env.VITE_API_URL}api/insert`

export const NewSecret: FC<NewSecretProps> = ({ setSecretWindow }): ReactElement => {
  const [data, setData] = useState<SecretEntity>({ age: 0, dislikes: 0, likes: 0, tags: [], secret: '', gender: 'man' })
  const [tags, setTags] = useState<string>('')
  
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
        className='w-xl bg-[#0B090A] h-[22.4em] rounded-xl text-[#F5F3F4] p-5 flex flex-col gap-5'
      >
        <div className='flex pb-2 justify-between items-center pr-2 border-1 border-b-[#F5F3F4] border-b-solid'>
          <p className='text-3xl'>What secret would you tell us? 💡</p>
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
        <div className='font-600 border-1 pb-4 border-b-[#F5F3F4] border-b-solid'>
          <p className='inline'>I am </p>
          <input
            required
            className='input'
            max={99}
            min={12}
            type='number'
            placeholder='age'
            onChange={(e) => setData((prev) => ({ ...prev, age: Number(e.target.value)}))}
          />
          <p className='inline'> years old and I am a </p>
          <select
            required
            className='input'
            onChange={(e) => setData((prev) => ({ ...prev, gender: e.target.value === 'man' ? 'man' : 'woman'}))}
          >
            <option defaultValue='gender' className='hidden'>
              gender
            </option>
            <option value='man'>man</option>
            <option value='woman'>woman</option>
          </select>
        </div>
        <textarea
          required
          maxLength={420}
          className='w-full h-[10rem] text-[18px] rounded-xl border-none bg-[#181818] text-[#F5F3F4] px-2 py-1 resize-none'
          onChange={(e) => setData((prev) => ({ ...prev, secret: e.target.value}))}
        />
        <div className='flex justify-between border-none'>
          <div className='flex justify-center gap-2'>
            <input
              maxLength={7}
              className='bg-[#181818] text-[#F5F3F4] px-4 rounded-1 border-none w-70 py-2'
              placeholder='tag (max 7 chars and 3 tags)'
              value={tags}
              onChange={(e) => {
                setTags(e.target.value)
              }}
            />
            <button
              disabled={data.tags.length === 3}
              className='flex justify-center items-center border-none rounded-md w-[3em] bg-red-5 duration-300 hover:bg-red-7'
              onClick={(e) => {
                setData((prev) => ({ ...prev, tags: [...prev.tags, tags] })), e.preventDefault(), setTags('')
              }}
            >
              <Icon icon='tabler:plus' fontSize={24} />
            </button>
          </div>
          <button
            type='submit'
            className='flex justify-center items-center border-none rounded-md w-[4em] bg-blue-5 duration-300 hover:bg-blue-7'
          >
            <Icon icon='tabler:send' fontSize={24}  />
          </button>
        </div>
      </form>
    </section>
  )
}
