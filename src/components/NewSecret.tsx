import { Icon } from '@iconify/react'
import { Dispatch, FC, FormEvent, ReactElement, SetStateAction, useReducer } from 'react'
import { formReducer, initialState } from 'utils'

interface NewSecretProps {
  setSecretWindow: Dispatch<SetStateAction<boolean>>
}

const url = `${import.meta.env.VITE_API_URL}api/insert`

export const NewSecret: FC<NewSecretProps> = ({ setSecretWindow }): ReactElement => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const requestBody = {
      age: state.age,
      tags: state.tags,
      gender: state.gender,
      secret: state.secret,
      likes: state.likes,
      dislikes: state.dislikes,
    }
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      dispatch({ type: 'reset' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className='h-screen w-full absolute bg-[#0B090Aba] backdrop-blur-2 top-0 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='w-xl bg-[#0B090A] h-[21.4em] rounded-xl text-[#F5F3F4] p-5'
      >
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
            required
            className='w-7 rounded-md border-none text-center'
            max={99}
            min={12}
            type='number'
            placeholder='age'
            onChange={(e) => dispatch({ type: 'setField', field: 'age', value: e.target.value })}
          />
          <p className='inline'> years old and I am a </p>
          <select
            required
            className='rounded-md border-none'
            onChange={(e) => dispatch({ type: 'setField', field: 'gender', value: e.target.value })}
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
          onChange={(e) => dispatch({ type: 'setField', field: 'secret', value: e.target.value })}
          maxLength={420}
          className='w-full h-[10rem] text-[18px] rounded-xl border-none mt-5 bg-[#181818] text-[#F5F3F4] px-2 py-1 resize-none'
        />
        <div className='flex justify-between border-none'>
          <input
            maxLength={35}
            onChange={(e) =>
              dispatch({ type: 'setField', field: 'tags', value: e.target.value.split(',') })
            }
            className='bg-[#181818] text-[#F5F3F4] px-4 rounded-1 border-none w-70 py-2'
            placeholder='tags (separated by commas and max 5)'
          />
          <button
            onClick={() =>
              setTimeout(() => {
                location.reload()
              }, 2000)
            }
            type='submit'
            className='border-none rounded-md px-2 py-1 bg-[#8b8b8b] mt-1'
          >
            Send
          </button>
        </div>
      </form>
    </section>
  )
}
