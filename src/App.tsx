import { Header } from 'components/Header'
import { NewSecret } from 'components/NewSecret'
import { SecretsContainer } from 'components/SecretsContainer'
import { FC, ReactElement, useState } from 'react'

export const App: FC = (): ReactElement => {
  const [secretWindow, setSecretWindow] = useState<boolean>(false)

  return (
    <div className=''>
      <Header setSecretWindow={setSecretWindow} />
      <SecretsContainer />
      {secretWindow && <NewSecret setSecretWindow={setSecretWindow} />}
    </div>
  )
}
