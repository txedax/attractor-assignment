'use client'

import { ExitIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface UserNavigationProps {
  user: Pick<User, 'email' | 'name' | 'image' | 'login'>
}

export const UserNavigation = ({ user }: UserNavigationProps) => {
  const email = user.email ?? ''
  const name = user.name ?? ''
  const image = user.image ?? ''
  const login = user.login ?? ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <div className='flex flex-col rounded-sm px-2 py-1.5 text-sm outline-none'>
          <div className='font-semibold'>{name}</div>
          <div>{email}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${login}`}>
            <PersonIcon className='mr-2' />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/settings'>
            <GearIcon className='mr-2' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async (event) => {
            event.preventDefault()

            await signOut({ callbackUrl: '/' })
          }}
        >
          <ExitIcon className='mr-2' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
