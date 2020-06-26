import { Bio } from '..'
import User from '../structures/User'
import PartialProfile from '../structures/PartialProfile'
import PartialProfileSettings from '../structures/PartialProfileSettings'
import { Collection,Snowflake } from 'discord.js'
async function topUpvoted(this:Bio):Promise<Collection<Snowflake,PartialProfile>> {
    const result = await this.rest.api('/topLikes','GET')
    let profiles = result.payload.map((profile: any) => {
        profile.discord = new User(profile.discord)
        profile.user = new PartialProfileSettings(profile.user)
        return profile
    })
    profiles = new Collection<Snowflake,PartialProfile>(result.payload.map((entry:any) => [entry.discord.id,entry]))
    return profiles
}
export = topUpvoted