import { Bio } from '../..'
import User from '../../structures/User'
import UserFlags from '../../structures/UserFlags'
async function details (this:Bio,slugOrID?:string) {
    const profile = await this.api('/user/details/' + slugOrID,'GET')
        profile.payload.settings.verified = Boolean(profile.payload.settings.verified)
        profile.payload.settings.premium = Boolean(profile.payload.settings.premium_status)
        delete profile.payload.settings.premium_status
        switch (profile.payload.settings.gender) {
            case 0 : profile.payload.settings.gender = 'male';break
            case 1 : profile.payload.settings.gender = 'female';break
            case 2 : profile.payload.settings.gender = "non-binary";break
            case null : break
        }
        profile.payload.settings.flags = new UserFlags(profile.payload.settings.flags)
        //append userful properties
        profile.payload.discord = new User(profile.payload.discord)
        return profile.payload
}
export = details
