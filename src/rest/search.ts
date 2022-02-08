import { Collection, Snowflake } from 'discord.js'
import PartialProfile from '../structures/PartialProfile'
import Profile from '../structures/Profile'
import { URLSearchParams } from 'url'
/**Options when searching for profiles */
export type searchOptions = {
  /**The search query. */
  search?: string
  /**
   * Filter options:
   * - all = search query is ignored
   * - search = search for profile, different fields consdiered
   * - slug-search = search for profile, only slug is considered
   * 
   * Set this to slug-search for slug searching, else this will default to 'all' or 'search' based on whether a query is given.
   */
  filter?: 'all' | 'search' | 'slug-search' | string
  /**Page number of results to be viewed */
  page?: number | string
}
/**
 * search for profiles
 * @param query search query
 * @example bio.search("nickchan")
 */
export async function search(this: import('../structures/Base'), options: searchOptions = { page: '0' }): Promise<Collection<Snowflake, PartialProfile>> {
  const array: Array<[string, string]> = []
  if (options.search) {
    array.push(['search',options.search])
    if (typeof options.filter === 'undefined') options.filter = 'search'
  } else if (typeof options.filter === 'undefined') options.filter = 'all'
  array.push(['filter', options.filter]);
  array.push(['page',String(options.page)]);
  const params = new URLSearchParams(array)
  const result = (await this.bio.rest.api('/users?' + params.toString(), 'GET')).filter((x:any) => x !== null)
  const profiles = result.map((profile: any) => new PartialProfile(this.bio, profile))
  const profileCollection = new Collection<Snowflake, PartialProfile>(profiles.map((entry: any) => [entry.discord.id, entry]))
  if (this.bio.options.enableCaching) profileCollection.forEach(profile => {
    if (!(profile.bio.profiles.get(profile.discord.id) instanceof Profile))
      this.bio.profiles.set(profile.discord.id, profile)
  })
  return profileCollection
}
