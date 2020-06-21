import ProfileSettings from './ProfileSettings'
import User from './User'
import DiscordConnection from './DiscordConnection'
import UserConnections from './UserConnections'
/**Represent a discord.bio profile */
type Profile = {
    /**The settings of this profile. */
    user: {
        details:ProfileSettings,
        discordConnections:Array<DiscordConnection>,
        userConnections:UserConnections
    }
    /**The user that this profile represents. */
    discord:User,
}
export = Profile