import Base from '../../structures/Base'
import User from '../../structures/User'
import { UserFlags,Collection } from 'discord.js'
import DiscordConnection from '../../structures/DiscordConnection'
async function details(this: Base, slugOrID: string): Promise<import('../../structures/Profile')> {
    const profile = await this.bio.api('/user/details/' + slugOrID, 'GET')
    const { details } = profile.payload.user
    details.verified = Boolean(details.verified)
    details.premium = Boolean(details.premium)
    switch (details.gender) {
        case 0: details.gender = 'male'; break
        case 1: details.gender = 'female'; break
        case 2: details.gender = "non-binary"; break
        case null: break
    }
    details.flags = new UserFlags(details.flags)
    details.staff = Boolean(details.staff)
    //append userful properties
    profile.payload.discord = new User(profile.payload.discord)
    return profile.payload
}
export = details
