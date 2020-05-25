import Base from '../../structures/Base'
import User from '../../structures/User'
import { UserFlags } from 'discord.js'
async function details (this:Base,slugOrID:string):Promise<import('../../structures/Profile')> {
    const profile = await this.bio.api('/user/details/' + slugOrID,'GET')
        profile.payload.settings.verified = Boolean(profile.payload.settings.verified)
        profile.payload.settings.premium = Boolean(profile.payload.settings.premium_status)
        delete profile.payload.settings.premium_status
        switch (profile.payload.settings.gender) {
            case 0 : profile.payload.settings.gender = 'male';break
            case 1 : profile.payload.settings.gender = 'female';break
            case 2 : profile.payload.settings.gender = "non-binary";break
            case null : break
        }
        profile.payload.settings.cached_flags = new UserFlags(profile.payload.settings.cached_flags)
        profile.payload.settings.staff = Boolean(profile.payload.settings.staff)
        //append userful properties
        profile.payload.discord = new User(profile.payload.discord)
        return profile.payload
}
export = details
