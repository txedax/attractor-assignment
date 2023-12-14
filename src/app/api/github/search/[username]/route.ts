import { GithubApi } from '~/lib/github-api'
import { getServerAuthSession } from '~/server/auth'

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const { username } = params

  const session = await getServerAuthSession()

  const data = await GithubApi.searchUserByLogin(username, session?.user.access_token)

  return new Response(JSON.stringify(data))
}
