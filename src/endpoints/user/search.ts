/*
https://discordapp.com/channels/661331961188712459/693649305105334272/712271223395975170
(it is in offical discord.bio server)
*/
import { Collection,Snowflake } from 'discord.js'
import PartialProfile from '../../structures/PartialProfile'
import DBioAPIError from '../../structures/DBioAPIError' 
async function search(this:import('../../structures/Base'),query:string):Promise<Collection<Snowflake,PartialProfile>> {
    const result = await this.bio.rest.api('/user/search/' + query,'GET')
    .catch((error:Error | DBioAPIError)=> {
        if (error instanceof DBioAPIError && error.message === 'No users found with this query.') {
            return { success:true,payload:[] }
        } else throw error
    })
    let profiles = result.payload.map((profile: any) => new PartialProfile(this.bio,profile))
    profiles = new Collection<Snowflake,PartialProfile>(profiles.map((entry:any) => [entry.discord.id,entry]))
    return profiles
}
export = search