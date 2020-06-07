import Base from '../../structures/Base'
import User from '../../structures/User'
import { UserFlags } from 'discord.js'
import { deprecate } from 'util'
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
    details.createdAt = new Date(details.created_at)
    Object.defineProperty(details,'createdTimestamp',{
        get:function() { return details.createdAt.getTime.bind(details.createdAt)() },
        set:function(timestamp:number) {
            details.createdAt = new Date(timestamp)
        }
    })
    Object.defineProperty(details,'created_at',{
        get:deprecate(function() { return details.createdAt.toISOString() },'Please use .createdAt.toISOString() instead.'),
        set:function(v) { details.createdAt = new Date(v) }
    })
    details.birthday = details.birthday ? new Date(details.birthday) : null
    details.flags = new UserFlags(details.flags)
    details.staff = Boolean(details.staff)
    //append userful properties
    profile.payload.discord = new User(profile.payload.discord)
    return profile.payload
}
export = details
