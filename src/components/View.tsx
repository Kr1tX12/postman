import { Eye, ViewIcon } from "lucide-react"
import Ping from "./Ping"
import { client } from "../sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "../sanity/lib/queries"
import { writeClient } from "../sanity/lib/write-client"
import { after } from "next/server";
const View = async ({ id } : { id: string }) => {
    const { views: totalViews } = await client
        .withConfig({useCdn: false})
        .fetch(STARTUP_VIEWS_QUERY, {id});   

    
    after( async () => {
        await writeClient
        .patch(id)
        .set({views: totalViews + 1})
        .commit();
    });
    
        
    return (
        <div className="flex justify-center items-center fixed bottom-5 right-5 bg-pink-200 px-7 rounded-sm">
            <div className="absolute -top-1 right-2">
                <Ping />
            </div>
            <span className="text-black font-bold text-xl flex items-center gap-1">
                {totalViews || 0} <Eye className="inline-block" />
            </span>
        </div>
    )
}

export default View