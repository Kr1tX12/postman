import { auth } from '@/auth';
import StartupForm from '@/src/components/StartupForm';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = () => {
  const session = auth();
  if (!session)
    redirect('/');

  
  return (
    <>
        <section className='black-container !min-h-[250px]'>
          <h1 className='heading'>
            Create your own Startup and Share it
          </h1>
        </section>
        <StartupForm />
    </>
  )
;}

export default Page;