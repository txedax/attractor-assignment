import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const fetcher = async <T>(url: string, options?: RequestInit) => {
  const response = await fetch(url, options)

  const data = (await response.json()) as T

  return data
}
