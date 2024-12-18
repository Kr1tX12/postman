import React from 'react'
import { client } from '../sanity/lib/client'
import { PLAYLIST_BY_SLUG_QUERY } from '../sanity/lib/queries';
import StartupGrid from './StartupGrid';

const RecommendedStartups = async () => {
    const { select: startups} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' });

    return (
        <StartupGrid posts={startups} />
    )
}

export default RecommendedStartups