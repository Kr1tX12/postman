import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return date.toLocaleDateString(  'en-US', { year: 'numeric', month: 'long', day: 'numeric' } )
}

export function parseServerActionResponce<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}