import Link from 'next/link'

import { type Repository } from '~/lib/types'
import { cn } from '~/lib/utils'

interface RepositoriesListProps {
  className?: string
  repositories: Repository[] | undefined
}

export const RepositoriesList = ({ className, repositories }: RepositoriesListProps) => {
  if (repositories === undefined) return <div>Loading repositories...</div>
  if (repositories.length === 0) return <div>Empty</div>

  return (
    <ul className={cn('grid grid-cols-1 gap-5 md:grid-cols-2', className)}>
      {repositories.map((repository) => (
        <li className='space-y-2 rounded border p-4' key={repository.id}>
          <div>
            <Link className='underline' href={repository.owner.html_url}>
              {repository.owner.login}
            </Link>
            <span className='mx-1'>•</span>
            <Link className='underline' href={repository.html_url}>
              {repository.name}
            </Link>
          </div>
          <div>{repository.description}</div>
        </li>
      ))}
    </ul>
  )
}
