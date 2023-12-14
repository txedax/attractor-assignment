'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { Button } from '~/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { useToast } from '~/components/ui/use-toast'
import { GithubApi } from '~/lib/github-api'
import { type SettingsFormRequest, SettingsFormSchema } from '~/lib/validators/settings'

export const Settings = () => {
  const router = useRouter()
  const { toast } = useToast()

  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    },
  })

  const form = useForm<SettingsFormRequest>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: { name: '', bio: '', company: '', location: '' },
  })

  useEffect(() => {
    if (status === 'authenticated') {
      const user = session.user

      form.setValue('name', user.name ?? '')
      form.setValue('bio', user.bio ?? '')
      form.setValue('company', user.company ?? '')
      form.setValue('location', user.location ?? '')
    }
  }, [session, status, form])

  const { mutate: updateSettings } = useMutation({
    mutationFn: async (props: SettingsFormRequest) => {
      if (session?.user.access_token !== undefined) return await GithubApi.patchUser(props, session?.user.access_token)

      throw Error('Invalid session token')
    },

    onSuccess: async (data) => {
      await update(data)

      toast({
        title: 'Success.',
        description: 'Your info has been updated.',
        variant: 'success',
      })
    },

    onError: () => {
      toast({
        title: `Something went wrong.`,
        description: 'Your info was not updated. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (values: SettingsFormRequest) => {
    updateSettings(values)
  }

  return (
    <section className='mx-auto max-w-[800px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea className='resize-none' placeholder='Bio' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder='Company' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder='Location' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </section>
  )
}
