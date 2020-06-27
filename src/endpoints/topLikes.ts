import { Bio } from '..'
import PartialProfile from '../structures/PartialProfile'
import { Collection,Snowflake } from 'discord.js'
async function topUpvoted(this:Bio):Promise<Collection<Snowflake,PartialProfile>> {
    const result = await this.rest.api('/topLikes','GET')
    let profiles = result.payload.map((profile: any) => new PartialProfile(this.bio,profile))
    profiles = new Collection<Snowflake,PartialProfile>(profiles.map((entry:any) => [entry.discord.id,entry]))
    return profiles
}
export = topUpvoted