import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth';
import { CirclePlus, CircleUserRound, LogOut } from 'lucide-react';
import { AUTHOR_BY_ID_QUERY } from '../sanity/lib/queries';
import { client } from '../sanity/lib/client';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = async () => {
    const session = await auth();

    console.log(session);

    return (
        <>
            <header className='px-4 py-2 bg-zinc-950'>
                <nav className='flex justify-between items-center'>
                    <Link href='/'>
                        <Image src='/logo.png' alt='Logo' width={100} height={100} />
                    </Link>

                    <div className="flex items-center gap-1 text-black">
                        { session && session.user ? (
                            <>
                                <Link href='/startup/create'>
                                    <span className='navbar-item max-sm:hidden'>Create</span>
                                    <CirclePlus className='sm:hidden text-white' />
                                </Link>

                                <form action={async () => {
                                    'use server';

                                    await signOut({redirectTo: '/'});
                                }}>
                                    <button type='submit' className='navbar-item max-sm:hidden'>Sign Out</button>
                                    <button type='submit' className='navbar-item sm:hidden'><LogOut /></button>
                                </form>

                                <form action={async () => {
                                    'use server';

                                    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id: session.id })
                                    console.log(user);
                                    redirect(`/user/${user?.slug?.current}`);
                                }}>
                                    <button type='submit' className='navbar-item'>
                                        <Avatar className='size-10'>
                                            <AvatarImage
                                                src={session?.user?.image || ''} 
                                                alt={session?.user?.name || ''} 
                                                className='rounded-full'
                                            />  
                                            <AvatarFallback>A</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </form>
                                
                            </>
                        )
                        : (
                            <>
                                <form action={async () => {
                                    'use server';

                                    await signIn('github');
                                }}>
                                    <button className='navbar-item' type='submit'>
                                        Sign In
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            

        </>
    )
}

export default Navbar