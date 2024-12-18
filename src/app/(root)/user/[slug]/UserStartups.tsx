'use server'

import StartupGrid from '@/src/components/StartupGrid'
import { client } from '@/src/sanity/lib/client'
import { STARTUPS_BY_USER_ID_QUERY } from '@/src/sanity/lib/queries'
import React from 'react'

const UserStartups = async ({ userID } : { userID: number}) => {

    const startups = await client.fetch(STARTUPS_BY_USER_ID_QUERY, { userID })

    return (
        <StartupGrid posts={startups} />
    )
}

export default UserStartups