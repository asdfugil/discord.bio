import { Bio } from '..'
import User from '../structures/User'
import PartialProfile from '../structures/PartialProfile'
async function topUpvoted(this:Bio):Promise<Array<PartialProfile>> {
    const result = await this.api('/topUpvoted','GET')
    const profiles = result.payload.map((profile: any) => {
        profile.discord = new User(profile.discord)
        profile.user.verified = Boolean(profile.user.verified)
        return profile
    })
    return profiles
}
export = topUpvoted