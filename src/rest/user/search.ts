/*
https://discordapp.com/channels/661331961188712459/693649305105334272/712271223395975170
(it is in offical discord.bio server)
*/
import { Collection, Snowflake } from 'discord.js'
import PartialProfile from '../../structures/PartialProfile'
import DBioAPIError from '../../structures/DBioAPIError'
import Profile from '../../structures/Profile'
/**
 * search for profiles
 * @param query search query
 * @example bio.users.search("nickchan")
 */
async function search(this: import('../../structures/Base'), query: string): Promise<Collection<Snowflake, PartialProfile>> {
  const result = await this.bio.rest.api('/user/search/' + query, 'GET')
    .catch((error: Error | DBioAPIError) => {
      if (error instanceof DBioAPIError && error.message === 'No users found with this query.') {
        return { success: true, payload: [] }
      } else throw error
    })
  const profiles = result.payload.map((profile: any) => new PartialProfile(this.bio, profile))
  const profileCollection = new Collection<Snowflake, PartialProfile>(profiles.map((entry: any) => [entry.discord.id, entry]))
  profileCollection.forEach(profile => {
    if (!(profile.bio.profiles.get(profile.discord.id) instanceof Profile))
      this.bio.profiles.set(profile.discord.id, profile)
  })
  return profileCollection
}
export = search