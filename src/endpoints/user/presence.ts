import Activity from '../../structures/Activity'
import { Snowflake } from 'discord.js'
import Base from '../../structures/Base'
async function presence(this:Base,user_id:Snowflake):Promise<Array<Activity>> {
    let presence:Array<any> = await this.bio.api(`/user/presence/${user_id}`,'GET')
    presence = presence.map(x => new Activity(this.bio,x))
    return presence
}
export = presence