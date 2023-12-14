import { type GithubProfile } from 'next-auth/providers/github'

export type User = Pick<
  GithubProfile,
  'id' | 'name' | 'avatar_url' | 'login' | 'email' | 'company' | 'location' | 'bio' | 'html_url'
>

export interface Repository {
  id: number
  name: string
  owner: User
  private: boolean
  html_url: string
  description: string
}

export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface SearchRequest<T> {
  total_counts: number
  incomplete_results: boolean
  items: T[]
}
