import { Bio } from '..'
import PartialProfile from '../structures/PartialProfile'
import { Collection,Snowflake } from 'discord.js'
import LikeInfo from '../structures/LikeInfo'
/**
 * Gets the most liked profile
 */
async function topLikes(this:Bio):Promise<LikeInfo> {
    const result = await this.rest.api('/topLikes','GET')
    let profiles = result.payload.users.map((profile: any) => new PartialProfile(this.bio,profile))
    profiles = new Collection<Snowflake,PartialProfile>(profiles.map((entry:any) => [entry.discord.id,entry]))
    const likeInfo = {
      pageTotal:result.payload.pageTotal,
      users:profiles
    }
    return likeInfo
}
export = topLikes