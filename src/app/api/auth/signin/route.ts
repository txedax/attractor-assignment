import { redirect } from 'next/navigation'

import { getServerAuthSession } from '~/server/auth'

export async function GET() {
  const session = await getServerAuthSession()

  redirect(`/${session?.user.login}`)
}
