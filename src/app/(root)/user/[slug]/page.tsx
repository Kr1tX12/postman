

import { auth } from '@/auth';
import StartupGrid from '@/src/components/StartupGrid';
import { client } from '@/src/sanity/lib/client';
import { AUTHOR_BY_SLUG_QUERY } from '@/src/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import UserStartups from './UserStartups';
import { Skeleton } from '@/components/ui/skeleton';

const Page = async ({ params } : { params: Promise<{slug: string}>}) => {

  const slug = (await params).slug;

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <Suspense fallback={<UserCardSkeleton />}>
        <UserPage slug={slug} />
      </Suspense>
    </section>
  )
}

const UserPage = async ({ slug }: { slug: string }) => {

  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_SLUG_QUERY, { slug });
  if (!user) return notFound();


  return (
    <>
      <div className='max-w-2xl w-full min-h-[300px] bg-zinc-900 rounded-xl flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center gap-3'>
          <img src={user.image} className='size-[150px] object-cover rounded-full' />
          <div className='flex flex-col'>
            <h1 className='text-center font-black text-5xl'>
              {user.name}
            </h1>
            <h3 className='font-extrabold text-xl bg-gradient-to-r from-pink-200 to-purple-400 bg-clip-text text-transparent w-min'>
              @{user.username}
            </h3>
          </div>
        </div>

        <div className='px-10 mt-4 w-full'>
          <p className='text-center text-gray-400 font-semibold text-sm'>
            {user.bio}
          </p>
        </div>

      </div>

      <div className='max-w-7xl w-full p-10'>
        <p className='font-bold text-2xl'>
          {user.name}'s startups:
        </p>
        <Suspense fallback={<UserStartupsSkeletons/>}>
          <UserStartups userID={user.id} />
        </Suspense>
      </div>
    </>
  )
};

const UserStartupsSkeletons = () => (
  Array.from({length: 6}, (_, index: number) => (
    <Skeleton key={'skeleton' + index} className='max-w-3xl w-full h-[150px]' />
  ))
);
const UserCardSkeleton = () => (
  <div className='max-w-2xl w-full min-h-[300px] bg-zinc-900 rounded-xl flex flex-col justify-center items-center'>
    <div className='flex items-center justify-center gap-3'>
      <Skeleton className='size-[150px] object-cover rounded-full' />
      <div className='flex flex-col'>
        <Skeleton className='w-32 h-8' />
        <Skeleton className='w-24 h-6 mt-2' />
      </div>
    </div>
    <div className='px-10 mt-4 w-full'>
      <Skeleton className='w-full h-4' />
    </div>
  </div>
);

export default Page;