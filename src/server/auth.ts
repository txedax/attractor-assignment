/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getServerSession, type NextAuthOptions, type DefaultSession, type User } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { type GithubProfile } from 'next-auth/providers/github'

import { env } from '~/env'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User
  }

  interface User extends GithubProfile {
    id: string
    email: string | null
    login: string
    name: string | null
    avatar_url: string
    company: string | null
    location: string | null
    bio: string | null
    html_url: string
    access_token?: string
  }

  interface Profile extends User {}
}

declare module 'next-auth/jwt' {
  interface JWT extends User {}
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        ...token,
      },
    }),

    jwt: ({ token, profile, account, trigger, session }) => {
      if (profile !== undefined) {
        token.id = profile.id
        token.email = profile.email
        token.login = profile.login
        token.name = profile.name
        token.avatar_url = profile.avatar_url
        token.company = profile.company
        token.location = profile.location
        token.bio = profile.bio
        token.html_url = profile.html_url
      }

      if (account !== undefined) {
        token.access_token = account?.access_token
      }

      if (trigger === 'update') {
        const { name, company, location, bio } = session
        token = { ...token, name, company, location, bio }
      }

      return token
    },
  },

  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: 'repo user project' },
      },
    }),
  ],
}

export const getServerAuthSession = async () => await getServerSession(authOptions)
