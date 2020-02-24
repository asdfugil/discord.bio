import User from './User'
import PartialProfileSettings from './PartialProfileSettings'
/**An imcomplete profile object */
type PartialProfile = {
    /**The discord.bio ID of the profile. */
    id:number
    /**The partial settings of the profile. */
    user:PartialProfileSettings
    /**The user that this profile represents */
    discord:User
}
export = PartialProfile