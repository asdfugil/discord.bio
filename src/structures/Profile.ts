import ProfileSettings from './ProfileSettings'
import User from './User'
import DiscordConnection from './DiscordConnection'
import UserConnections from './UserConnections'
import enumerable from '../util/enumerable'
import { Bio, Activity } from '..'
import { EventEmitter } from 'events'
import connect from '../websocket'
import { client as WebSocket } from 'websocket'
/**
 * Represent a discord.bio profile 
 */
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
  /**Connect to this profile's websocket
   * @example profile.connect()
   */
  connect:typeof connect
  /**
   * Websocket Information
   * @example profile.ws.close()
   * @example profile.ws.ping
   */
  ws:{
    /**The websocket */
    socket?:WebSocket
    /**Websocket ping */
    ping?:number
  }
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
    this.ws = {}
    this.connect = connect
    if (this.bio.options.ws.autoConnect) this.connect()
  }
  async fetch(): Promise<Profile> {
    return this.bio.users.details(this.discord.id)
  }
 /**Emitted when a websocket connection is established*/
  on(event:'connect',listener:() => void):this
  /** Emitted when the websocket successfully subscribe to the profile*/
  on(event:'subscribe',listener:
  /**@param view_count The number of people viewing the profile*/
  (view_count:number) => void):this
  /**Emiited when someone starts or stop viewing the profile */
  on(event:'viewCountUpdate',listener:
  /**@param view_count The number of people viewing the profile*/
  (view_count:number) => void):this
  /**Emitted when the presence is updated */
  on(event:'presenceUpdate',listener:
  /**@param activity The activity if there is one, or null if there isn't */
  (activity:Activity | null) => void):this
  /**Emitted when the profile is updated */
  on(event:'profileUpdate',listener:
  /**@param profile The updated profile data*/
  (profile:{ connections:UserConnections,settings:ProfileSettings }) => void):this
  /**Emitted when the profile's banner is updated */
  on(event:'bannerUpdate',listener:
  /**@param banner_exists Whether the user still has a banner */
  (has_banner:boolean) => void):this 
  /**Emitted when the websocket is closed */
  on(event:'close',listener:() => void):this
  on(event:string,listener:(...args:any[]) => void):this {
    return super.on(event,listener)
  }
}
export = Profile