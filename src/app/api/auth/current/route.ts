import { getServerAuthSession } from '~/server/auth'

export async function GET() {
  const session = await getServerAuthSession()

  return new Response(JSON.stringify(session?.user))
}
