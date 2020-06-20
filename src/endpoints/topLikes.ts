import { Bio } from '..'
import User from '../structures/User'
import PartialProfile from '../structures/PartialProfile'
import { Collection,Snowflake } from 'discord.js'
async function topUpvoted(this:Bio):Promise<Collection<Snowflake,PartialProfile>> {
    const result = await this.api('/topUpvoted','GET')
    let profiles = result.payload.map((profile: any) => {
        profile.discord = new User(profile.discord)
        profile.user.verified = Boolean(profile.user.verified)
        profile.user.premium = Boolean(profile.user.premium)
        profile.user.upvotes = profile.user.likes
        return profile
    })
    profiles = new Collection<Snowflake,PartialProfile>(result.payload.map((entry:any) => [entry.discord.id,entry]))
    return profiles
}
export = topUpvoted