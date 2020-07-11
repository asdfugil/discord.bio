import ProfileSettings from './ProfileSettings'
import User from './User'
import DiscordConnection from './DiscordConnection'
import UserConnections from './UserConnections'
import enumerable from '../util/enumerable'
import { Bio, Activity } from '..'
import { EventEmitter } from 'events'
import connect from '../websocket'
/**Represent a discord.bio profile */
class Profile extends EventEmitter {
  @enumerable(false)
  bio: Bio
  /**The settings of this profile. */
  user: {
    details: ProfileSettings
    discordConnections: Array<DiscordConnection>
    userConnections: UserConnections
  }
  /**The user that this profile represents. */
  discord: User
  connect:typeof connect
  constructor(bio: Bio, data: any) {
    super()
    const { details, discordConnections, userConnections } = data.user
    this.user = {
      details: new ProfileSettings(details),
      discordConnections: discordConnections,
      userConnections: userConnections
    }
    this.discord = new User(data.discord)
    this.bio = bio
    this.connect = connect
  }
  async fetch(): Promise<Profile> {
    return this.bio.users.details(this.discord.id)
  }
  on(event:'connect',listener:() => void):this
  on(event:'subscribe',listener:(view_count:number) => void):this
  on(event:'totalViewing',listener:(view_count:number) => void):this
  on(event:'presence',listener:(activity:Activity) => void):this
  on(event:'profileUpdate',listener:(profile:{ connections:UserConnections,settings:ProfileSettings }) => void):this
  on(event:'bannerUpdate',listener:(...args:unknown[]) => void):this 
  on(event:string,listener:(...args:any[]) => void):this {
    return super.on(event,listener)
  }
}
export = Profile