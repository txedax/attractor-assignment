'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { GithubApi } from '~/lib/github-api'

import { SearchInput } from '../features/search-input'
import { SearchUsersList } from '../widgets/search-users-list'

export const Search = () => {
  const { data: session } = useSession()
  const [input, setInput] = useState('')

  const { data: users, refetch: refetchSearch } = useQuery({
    queryKey: ['search-query'],
    queryFn: async () => {
      if (!input) return []

      const data = await GithubApi.searchUserByLogin(input, session?.user.access_token)

      return data.items
    },
    enabled: false,
  })

  return (
    <div className='mx-auto max-w-[800px] space-y-5'>
      <SearchInput value={input} setValue={setInput} refetch={refetchSearch} />
      {users && <SearchUsersList users={users} />}
    </div>
  )
}
