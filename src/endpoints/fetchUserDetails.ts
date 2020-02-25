import Profile from '../structures/Profile'
import fetch from 'node-fetch'
import { Bio } from '..'
/**
 * Fetch profile by user id or slug,if sulgOrID is not provided,it will retrun the details of the logged in user.
 */
async function fetchUserDetails(this:Bio,slugOrID:string): Promise<Profile> {
    const profile = await fetch(`${(this).baseURL}/UserDetails/${slugOrID || ''}`, {
        headers: {
            cookie: this.cookie
        }
    }).then(response => response.json())
    if (profile.success) {
        profile.payload.settings.verified = Boolean(profile.payload.settings.verified)
        profile.payload.settings.premium = Boolean(profile.payload.settings.premium_status)
        delete profile.payload.settings.premium_status
        profile.payload.discord.tag = `${profile.payload.discord.username}#${profile.payload.discord.discriminator}`
        profile.payload.discord.avatarURL = `https://cdn.discordapp.com/avatars/${profile.payload.discord.id}/${profile.payload.discord.avatar}`
        if (profile.payload.settings.gender === 1) profile.payload.settings.gender = 'male'
        else if (profile.payload.settings.gender === 2) profile.payload.settings.gender = 'female';
        return profile.payload
    }
    else throw new Error(profile.message || 'Unsuccessful response.')
}
export = fetchUserDetails