import { formatDate } from '@/lib/utils';
import { client } from '@/src/sanity/lib/client';
import { STARTUP_QUERY_BY_SLUG } from '@/src/sanity/lib/queries';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

import markdownit from 'markdown-it';
import View from '@/src/components/View';
import RecommendedStartups from '@/src/components/RecommendedStartups';
const md = markdownit({
    
});

export const experimental_ppr = true;
const page = async ({ params }: {params: Promise<{ slug: string} >}) => {
    const { slug } = await params;

    const post = await client.fetch(STARTUP_QUERY_BY_SLUG, {slug});
    console.log(post);
    if (!post) notFound();

    const parsedContent = md.render(`${post.pitch}` || '');

    return (
        <>
            <section className='black-container !h-[300px]'>
                <p className='tag'>{formatDate(new Date(post._createdAt))}</p>
                <p className='heading'>{post.title}</p>
                <p className='sub-heading'>{post.description}</p>
            </section>

            <section className='section-container flex flex-col gap-4'>
                <img className='w-full max-h-[400px] object-cover rounded-lg' src={post.image || undefined} alt='Startup Image' />

                <div>
                    <div className='flex gap-2 items-center'> 
                        <Link href={`/user/${[post.author?.slug.current]}`}>
                            <div className='flex gap-2 items-center'>
                                <img src={post.author?.image || undefined} alt='Author Image' className='size-16 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-xl font-bold'>
                                        {post.author?.name}
                                    </p>
                                    <p className='text-gray-400'>
                                        @{post.author?.username}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        
                        <div className='flex-1'></div>
                        <Link className='' href={`/?query=${post.category}`}>
                            <span className='bg-zinc-800 px-4 py-2 rounded-full font-bold'>
                                {post.category}
                            </span>
                        </Link>
                    </div>
                </div>
                <h3 className='font-extrabold text-2xl'>
                    Pitch details
                </h3>
                {parsedContent ? 
                    <article
                        className='prose !text-white'
                        dangerouslySetInnerHTML={{__html: parsedContent}}
                    >

                    </article>
                : <p>No details provided</p>}

                <hr className='divider'></hr>

                <View id={post._id} />

                <RecommendedStartups />
            </section> 
            
        </>
    )
}

export default page