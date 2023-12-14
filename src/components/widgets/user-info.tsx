'use client'

import Link from 'next/link'
import { type User } from 'next-auth'
import { useQuery } from 'react-query'

import { fetcher } from '~/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const userProperties = {
  login: 'Login',
  email: 'Email',
  company: 'Company',
  location: 'Location',
  bio: 'Bio',
}

export const UserInfo = ({ username }: { username: string }) => {
  const { isLoading, data: user } = useQuery('user', async () => await fetcher<User>(`/api/github/${username}`))

  if (isLoading || user === undefined) return <div>Loading user</div>

  return (
    <div className='flex flex-col items-center gap-10 md:flex-row'>
      <div className='relative'>
        <Avatar className='h-[300px] w-[300px] border'>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </div>
      <ul>
        {Object.entries(userProperties).map((value) => (
          <li className='grid grid-cols-2' key={value[0]}>
            <div>{value[1]}:</div>
            <div>{user[value[0]]}</div>
          </li>
        ))}
        <li className='grid grid-cols-2'>
          <div>Github:</div>
          <Link className='underline' href={user.html_url}>
            github
          </Link>
        </li>
      </ul>
    </div>
  )
}
