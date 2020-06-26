import Base from '../../structures/Base'
import User from '../../structures/User'
import ProfileSettings from '../../structures/ProfileSettings'
async function details(this: Base, slugOrID: string): Promise<import('../../structures/Profile')> {
    const profile = await this.bio.rest.api('/user/details/' + slugOrID, 'GET')
    profile.payload.user.details = new ProfileSettings(profile.payload.user.details)
    profile.payload.discord = new User(profile.payload.discord)
    return profile.payload
}
export = details
