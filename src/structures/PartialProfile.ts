import User from './User'
import PartialProfileSettings from './PartialProfileSettings'
import { Bio } from '..'
import Profile from './Profile'
import enumerable from '../util/enumerable' 
/**An incomplete profile object */
class PartialProfile {
    @enumerable(false)
    bio:Bio
    /**The partial settings of the profile. */
    user:PartialProfileSettings
    /**The user that this profile represents */
    discord:User
    constructor(bio:Bio,data:any) {
        this.bio = bio
        this.user = new PartialProfileSettings(data.user)
        this.discord = new User(data.discord)
    }
    /**Fetch this profile */
    async fetch():Promise<Profile> {
        return this.bio.users.details(this.discord.id)
    }
}
export = PartialProfile