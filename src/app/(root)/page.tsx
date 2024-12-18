import SearchForm from "@/src/components/SearchForm";
import StartupCard, { StartupCardType } from "@/src/components/StartupCard";
import { sanityFetch, SanityLive } from "@/src/sanity/lib/live";
import { STARTUPS_QUERY } from "@/src/sanity/lib/queries";
import HomePageBackground from "@/src/components/threejs/HomePageBackground";
import StartupGrid from "@/src/components/StartupGrid";

export default async function Home({ searchParams } : {
    searchParams: Promise<{query?: string}>
}) {
    const query =  (await searchParams).query

    const params = {search: query || null} 
    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

    

    return (
      <>
        <section className="black-container">
          <h1 className="heading z-10"><span className="font-black text-blue-300">Express</span> yourself, <br/>create your <span className="bg-gradient-to-r from-blue-300 to-blue-400 -rotate-4 p-2 inline-block">startup</span></h1>

          <p className="sub-heading z-10">It never was as easy as it is now</p>

          <SearchForm query={query} />

          <div className="absolute inset-0 pointer-events-none max-sm:hidden">
            <HomePageBackground />
          </div>
        </section>

        <section className='section-container'>
          <p className='text-2xl font-semibold'>
            {query ? (
              `Search results for ${query}:`
            ) : (
              `All startups`
            )}
          </p>

          <StartupGrid posts={posts} />

          
        </section>

        <SanityLive />
      </>
    );
}
