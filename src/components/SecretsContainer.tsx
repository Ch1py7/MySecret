import { FC, ReactElement } from 'react'
import { Card } from './Card'
import { useFetch } from 'hooks'
import { Secrets } from 'types/secrets'

export const SecretsContainer: FC = (): ReactElement => {
  const { data } = useFetch<Secrets[]>()

  if (!data) return <h1>loading</h1>
  return (
    <section className='bg-[#141113] h-[calc(100vh-70px)] py-6'>
      {data.map((secrets, index) => (
        <Card key={index} secrets={secrets} />
      ))}
    </section>
  )
}
