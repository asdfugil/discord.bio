import ProfileSettings from './ProfileSettings'
import User from './User'
/**Represent a discord.bio profile */
type Profile = {
    /**The settings of this profile. */
    settings: ProfileSettings
    /**The user that this profile represents. */
    discord:User
}
export = Profile