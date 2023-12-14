import debounce from 'lodash.debounce'
import { type Dispatch, type SetStateAction, useCallback, useEffect } from 'react'
import { useQueryClient, type useQuery } from 'react-query'

import { Input } from '../ui/input'

interface SearchInputProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  refetch: Pick<ReturnType<typeof useQuery>, 'refetch'>['refetch']
}

export const SearchInput = ({ value, setValue, refetch }: SearchInputProps) => {
  const request = debounce(async () => {
    return await refetch()
  }, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRequest = useCallback(async () => await request(), [])

  const queryClient = useQueryClient()
  useEffect(() => {
    return () => {
      queryClient.setQueryData('search-query', [])
    }
  }, [queryClient])

  return (
    <Input
      placeholder='Enter username'
      value={value}
      onChange={async (event) => {
        setValue(event.target.value)
        await debounceRequest()
      }}
    />
  )
}
