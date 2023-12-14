'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'

import { Button } from '../ui/button'

export const LoginButton = () => {
  const login = async () => {
    try {
      await signIn('github', { callbackUrl: '/api/auth/signin' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button className='h-10 w-10 rounded-full border border-white p-0' onClick={login}>
      <GitHubLogoIcon />
    </Button>
  )
}
