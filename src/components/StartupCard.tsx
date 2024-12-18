import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Author, Startup } from '../sanity/types'

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author }
const StartupCard = ({ post } : { post: StartupCardType}) => {
  return (
    <li className='startup-card'>
        <div className='flex justify-between'>
            <p className='font-bold'>
                {formatDate(new Date(post._createdAt))};
            </p>
            <div className='flex gap-1.5 items-center'>
                <EyeIcon className='size-6 text-primary' />
                <span className='font-bold'>{post.views || 0}</span>
            </div>
        </div>

        <div className='flex gap-5 mt-2 justify-between items-center'>
            <div className='flex-1'>
                <Link href={`/user/${post.author?.slug.current}`}>
                    <p className='font-bold line-clamp-1'>
                        {post.author?.name}
                    </p>
                </Link>
                <Link href={`/startup/${post.slug?.current}`}>
                    <p className='line-clamp-1 font-extrabold text-2xl'>
                        {post.title}
                    </p>
                </Link>
            </div>
            <Link href={`/user/${post.author?.slug.current}`}>
                <img width={50} height={50} alt="Аватарка" className='rounded-full size-12' src={post.image} />
            </Link>
        </div>

        <Link href={`/startup/${post.slug?.current}`}>
            <p className='font-normal line-clamp-3 my-3'>
                {post.description}
            </p>
            
            <img className='w-full h-[150px] rounded-2xl object-cover' src={post.image} />
        </Link>

        <div className='flex justify-between items-center mt-5'>
            <Link href={`/?query=${post.category}`}>
                <p className='font-bold'>
                    {post.category}
                </p>
            </Link>

            <Button className='rounded-full bg-slate-950 text-white font-bold' asChild>
                <Link href={`/startup/${post.slug?.current}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
}

export default StartupCard