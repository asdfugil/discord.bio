import ProfileSettings from './ProfileSettings'
import User from './User'
import DiscordConnection from './DiscordConnection'
import UserConnections from './UserConnections'
import enumerable from '../util/enumerable'
import { Bio } from '..'
import Base from './Base'
/**Represent a discord.bio profile */
class Profile extends Base {
    /**The settings of this profile. */
    user: {
        details:ProfileSettings
        discordConnections:Array<DiscordConnection>
        userConnections:UserConnections
    }
    /**The user that this profile represents. */
    discord:User
    constructor (bio:Bio,data:any) {
        super(bio)
        const { details,discordConnections,userConnections } = data.user
        this.user = {
            details:new ProfileSettings(details),
            discordConnections:discordConnections,
            userConnections:userConnections
        }
        this.discord = new User(data.discord)
        this.bio = bio
    }
    async fetch():Promise<Profile> {
        return this.bio.users.details(this.discord.id)
    }
}
export = Profile