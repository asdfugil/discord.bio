import User from './User'
import PartialProfileSettings from './PartialProfileSettings'
import { Bio } from '..'
import Profile from './Profile'
import connect from '../websocket'
import Base from './Base'
/**An incomplete profile object */
class PartialProfile extends Base{
  /**The partial settings of the profile. */
  user: PartialProfileSettings
  /**The user that this profile represents */
  discord: User
  connect: typeof connect
  constructor(bio: Bio, data: any) {
    super(bio)
    this.bio = bio
    this.user = new PartialProfileSettings(data.user)
    this.discord = new User(data.discord)
    this.connect = connect
  }
  /**Fetch this profile */
  async fetch(): Promise<Profile> {
    return this.bio.users.details(this.discord.id)
  }
}
export = PartialProfile