import { Filter } from 'components/Filter'
import { Header } from 'components/Header'
import { NewSecret } from 'components/NewSecret'
import { SecretsContainer } from 'components/SecretsContainer'
import { FC, ReactElement, useState } from 'react'

export const App: FC = (): ReactElement => {
  const [secretWindow, setSecretWindow] = useState<boolean>(false)
  const [filters, setFilters] = useState<boolean>(false)
  const [tagFilter, setTagFilter] = useState<string[]>([])
  const [ageFilter, setAgeFilter] = useState<string>('')

  return (
    <div>
      <Header setSecretWindow={setSecretWindow} setFilters={setFilters} />
      <SecretsContainer tagFilter={tagFilter} ageFilter={ageFilter} />
      {filters &&
        <Filter
          setFilters={setFilters}
          setTagFilter={setTagFilter}
          setAgeFilter={setAgeFilter}
          tagFilter={tagFilter}
          ageFilter={ageFilter}
        />}
      {secretWindow && <NewSecret setSecretWindow={setSecretWindow} />}
    </div>
  )
}
