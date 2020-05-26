/*
The search endpoint is an unlisted endpoint.
Normally,we are not allowed to use it according to the TOS.
I are allowed to add it to this pacakge according to this message from the owner.
https://discordapp.com/channels/661331961188712459/693649305105334272/712271223395975170
(it is in offical discord.bio server)
*/
import { Collection,Snowflake } from 'discord.js'
import PartialProfile from '../../structures/PartialProfile'
import User from '../../structures/User'
import DBioAPIError from '../../structures/DBioAPIError'
async function search(this:import('../../structures/Base'),query:string):Promise<Collection<Snowflake,PartialProfile>> {
    const result = await this.bio.api('/user/search/' + query,'GET')
    .catch((error:Error | DBioAPIError)=> {
        if (error instanceof DBioAPIError && error.message === 'No users found with this query.') {
            return { success:true,payload:[] }
        } else throw error
    })
    let profiles = result.payload.map((profile: any) => {
        profile.discord = new User(profile.discord)
        profile.user.verified = Boolean(profile.user.verified)
        profile.user.premium = Boolean(profile.user.premium)
        return profile
    })
    profiles = new Collection<Snowflake,PartialProfile>(result.payload.map((entry:any) => [entry.discord.id,entry]))
    return profiles
}
export = search