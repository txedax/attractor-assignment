import { type SearchRequest, type Repository, type User } from './types'
import { fetcher } from './utils'

const initial = (token?: string) => {
  const url = 'https://api.github.com'
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (token !== undefined) headers.Authorization = `Bearer ${token}`

  return { url, headers }
}

const getUser = async (username: string, token?: string) => {
  const { url, headers } = initial(token)
  return await fetcher<User>(`${url}/users/${username}`, { headers })
}

const patchUser = async (payload: Pick<User, 'name' | 'bio' | 'company' | 'location'>, token: string) => {
  const { url, headers } = initial(token)
  return await fetcher<User>(`${url}/user`, { headers, method: 'PATCH', body: JSON.stringify(payload) })
}

const getUserRepositories = async (username: string) => {
  const { url, headers } = initial()
  return await fetcher<Repository[]>(`${url}/users/${username}/repos`, { headers })
}

const getAuthenticatedUserRepositories = async (token: string, privateFilter: boolean) => {
  const { url, headers } = initial(token)
  const data = await fetcher<Repository[]>(`${url}/user/repos`, { headers })

  return data.filter((repository) => repository.private === privateFilter)
}

const searchUserByLogin = async (query: string, token?: string) => {
  const { url, headers } = initial(token)
  return await fetcher<SearchRequest<User>>(`${url}/search/users?q=${query} in:login`, { headers })
}

export const GithubApi = {
  getUser,
  patchUser,
  getUserRepositories,
  getAuthenticatedUserRepositories,
  searchUserByLogin,
}
