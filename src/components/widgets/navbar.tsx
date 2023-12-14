import Link from 'next/link'

import { getServerAuthSession } from '~/server/auth'

import { LoginButton } from '../features/login-button'
import { buttonVariants } from '../ui/button'

import { UserNavigation } from './user-navigation'

export const Navbar = async () => {
  const session = await getServerAuthSession()

  const user = session?.user

  return (
    <nav className='flex h-[50px] items-center justify-between bg-slate-900 px-5 text-white'>
      <Link className={buttonVariants({ variant: 'outline' })} href='/'>
        Search
      </Link>
      {user !== undefined ? <UserNavigation user={user} /> : <LoginButton />}
    </nav>
  )
}
