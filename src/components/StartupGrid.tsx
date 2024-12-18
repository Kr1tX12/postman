import { STARTUPS_QUERYResult } from '../sanity/types'
import StartupCard, { StartupCardType } from './StartupCard'

const StartupGrid = ({ posts } : { posts: STARTUPS_QUERYResult }) => {
  return (
    <ul className="card-grid mt-7">
    {
        posts.length > 0 
        ? posts.map((post: StartupCardType, index: number) => (
        <StartupCard key={index} post={post} />
        ))
        : <p>No results</p>
    }
    </ul>
  )
}

export default StartupGrid