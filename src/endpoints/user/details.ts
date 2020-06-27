import Base from '../../structures/Base'

import Profile from '../../structures/Profile'
async function details(this: Base, slugOrID: string): Promise<Profile> {
    const profile = await this.bio.rest.api('/user/details/' + slugOrID, 'GET')
    profile.payload = new Profile(this.bio,profile.payload)
    return profile.payload
}
export = details
