import { UserInfo } from '~/components/widgets/user-info'
import { UserRepositories } from '~/components/widgets/user-repositories'

export const Profile = ({ username }: { username: string }) => {
  return (
    <section className='mx-auto max-w-[800px] space-y-10'>
      <UserInfo username={username} />
      <UserRepositories username={username} />
    </section>
  )
}
