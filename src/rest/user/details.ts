import Base from '../../structures/Base'
import Profile from '../../structures/Profile'
/**
* Get user Details
@example bio.users.details("nickchan")
*/
async function details(this: Base, slugOrID: string): Promise<Profile> {
  const result = await this.bio.rest.api('/user/details/' + slugOrID, 'GET')
  const profile = new Profile(this.bio, result.payload)
  if (this.bio.options.enableCaching) this.bio.profiles.set(profile.discord.id, profile)
  return profile
}
export = details
