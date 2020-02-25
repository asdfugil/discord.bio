import fetch from 'node-fetch'
import Bio from '..'
import User from '../structures/User'
import PartialProfile from '../structures/PartialProfile'
async function fetchTopUpvoted(this:Bio):Promise<Array<User>> {
    const result = await fetch(`${this.baseURL}/topUpvoted`).then(r => r.json())
    if (!result.success) throw new Error(result.message || "Unsuccessful response")
    const profiles = result.payload.map((profile: PartialProfile) => {
        profile.discord = new User(profile.discord)
        return profile
    })
    return profiles
}
export = fetchTopUpvoted