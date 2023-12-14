import { type User } from 'next-auth'
import { useQuery } from 'react-query'

import { fetcher } from '~/lib/utils'

export const useAuth = () => {
  const { data: user, isLoading } = useQuery('auth', async () => await fetcher<User>('/api/auth/current'))

  return { user, isLoading }
}
