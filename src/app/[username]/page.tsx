import { Profile } from '~/components/pages/profile'

export default function Page({ params }: { params: { username: string } }) {
  return <Profile username={params.username} />
}
