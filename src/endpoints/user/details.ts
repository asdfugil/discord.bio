import { Bio } from '../..'
import User from '../../structures/User'
async function details (this:Bio,slugOrID?:string) {
    const profile = await this.api('/user/details/' + slugOrID,'GET',{
        cookie:this.cookie,
    })
        profile.payload.settings.verified = Boolean(profile.payload.settings.verified)
        profile.payload.settings.premium = Boolean(profile.payload.settings.premium_status)
        delete profile.payload.settings.premium_status
        profile.payload.discord.tag = `${profile.payload.discord.username}#${profile.payload.discord.discriminator}`
        profile.payload.discord.avatarURL = `https://cdn.discordapp.com/avatars/${profile.payload.discord.id}/${profile.payload.discord.avatar}`
        switch (profile.payload.settings.gender) {
            case 0 : profile.payload.settings.gender = 'male'
            case 1 : profile.payload.settings.gender = 'female'
            case 2 : profile.payload.settings.gender = "non_binary"
            case null : {}
        }
        //append userful properties
        profile.payload.discord = new User(profile.payload.discord)
        return profile.payload
}
export = details
