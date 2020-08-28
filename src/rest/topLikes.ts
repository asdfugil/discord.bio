import { Bio, Profile } from '..'
import PartialProfile from '../structures/PartialProfile'
import { Collection, Snowflake } from 'discord.js'
import TopInfo from '../structures/TopInfo'
/**
 * Gets the most liked profile
 */
async function topLikes(this: Bio): Promise<TopInfo> {
  const result = await this.rest.api('/user/top', 'GET')
  const profiles = result.payload.users.map((profile: any) => new PartialProfile(this.bio, profile))
  let profileCollection = new Collection<Snowflake, PartialProfile>(profiles.map((entry: any) => [entry.discord.id, entry]))
  const likeInfo = {
    pageTotal: result.payload.pageTotal,
    users: profileCollection
  }
  if (this.bio.options.enableCaching) profileCollection.forEach(profile => {
    if (!(profile.bio.profiles.get(profile.discord.id) instanceof Profile))
      this.bio.profiles.set(profile.discord.id, profile)
  })
  return likeInfo
}
export = topLikes
