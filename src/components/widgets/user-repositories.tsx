'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { GithubApi } from '~/lib/github-api'

import { Button } from '../ui/button'

import { RepositoriesList } from './repositories-list'

export const UserRepositories = ({ username }: { username: string }) => {
  const { data: session, status } = useSession()
  const [showPrivate, setShowPrivate] = useState(false)

  const { data: repositories } = useQuery(
    ['repositories', showPrivate],
    async () => {
      if (session?.user.access_token !== undefined && showPrivate) {
        return await GithubApi.getAuthenticatedUserRepositories(session?.user.access_token, showPrivate)
      } else {
        return await GithubApi.getUserRepositories(username)
      }
    },
    { enabled: status !== 'loading' },
  )

  const ToggleRepositoriesButton = (
    <Button
      onClick={() => {
        setShowPrivate(!showPrivate)
      }}
    >
      Toggle visibility: {showPrivate ? 'Private' : 'Public'}
    </Button>
  )

  const showToggleRepositoriesButton = status === 'authenticated' && session.user.login === username

  return (
    <div className='space-y-4'>
      {showToggleRepositoriesButton ? ToggleRepositoriesButton : null}
      <RepositoriesList repositories={repositories} />
    </div>
  )
}
