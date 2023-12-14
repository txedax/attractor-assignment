import { useState } from 'react'
import { useQuery } from 'react-query'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { GithubApi } from '~/lib/github-api'
import { type User } from '~/lib/types'

import { RepositoriesList } from './repositories-list'

export const SearchUsersList = ({ users }: { users: User[] }) => {
  const [selectedUser, setSelectedUser] = useState('')

  const { data: repositories } = useQuery(
    [`${selectedUser}:repositories`],
    async () => await GithubApi.getUserRepositories(selectedUser),
    { enabled: !!selectedUser },
  )

  return (
    <Accordion
      onValueChange={(value) => {
        if (value !== '') {
          setSelectedUser(value)
        }
      }}
      type='single'
      collapsible
      className='w-full'
    >
      {users?.map((user) => (
        <AccordionItem key={user.id} value={user.login}>
          <AccordionTrigger>{user.login}</AccordionTrigger>
          <AccordionContent>
            {user.login === selectedUser ? <RepositoriesList repositories={repositories} /> : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
