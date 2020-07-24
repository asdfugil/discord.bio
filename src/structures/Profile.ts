import ProfileSettings from './ProfileSettings'
import User from './User'
import DiscordConnection from './DiscordConnection'
import UserConnections from './UserConnections'
import enumerable from '../util/enumerable'
import { Bio, Activity, Collection } from '..'
import { EventEmitter } from 'events'
import connect from '../websocket'
import { client as WebSocket } from 'websocket'
import Presence from './Presence'
import DiscordConnections from './DiscordConnections'
/**
 * Represent a discord.bio profile 
 */
class Profile extends EventEmitter {
  @enumerable(false)
  bio: Bio
  /**The settings of this profile. */
  user: {
    details: ProfileSettings
    discordConnections: DiscordConnections
    userConnections: UserConnections
    /**
     * @deprecated Use profile.user.discord.presence.activtiy instead
     */
    readonly activity: Activity | null
  }
  /**The user that this profile represents. */
  discord: User
  /**Connect to this profile's websocket
   * @example profile.connect()
   */
  connect: typeof connect
  /**
   * Websocket Information
   * @example profile.ws.socket.close()
   * @example profile.ws.ping
   */
  ws: {
    /**The websocket */
    socket?: WebSocket
    /**Websocket ping */
    ping?: number
  }
  constructor(bio: Bio, data: any) {
    super()
    const { details, discordConnections, userConnections } = data.user
    this.user = {
      details: new ProfileSettings(details),
      discordConnections: new DiscordConnections(discordConnections),
      userConnections: userConnections || {},
      activity: null
    }
    Object.defineProperty(this.user, 'activity', {
      get: () => this.discord.presence?.activity || null,
    })
    this.bio = bio
    this.discord = new User(this.bio, data.discord)
    this.ws = {}
    this.connect = connect
    if (this.bio.options.ws.autoConnect) this.connect()
  }
  async fetch(): Promise<Profile> {
    return this.bio.users.details(this.discord.id)
  }
  /**
   * Patch this profile
   * @param patch Data for this patch
   * @private
   */
  _patch(patch: any): this {
    const { details, userConnections, discordConnections } = patch.user
    this.user.details = new ProfileSettings(details)
    this.user.userConnections = userConnections || {}
    this.discord = patch.discord
    this.user.discordConnections = new DiscordConnections(discordConnections)
    return this
  }
  /**Emitted when a websocket connection is established*/
  on(event: 'connect', listener: () => void): this
  /** Emitted when the websocket successfully subscribe to the profile*/
  on(event: 'subscribe', listener:
    /**@param view_count The number of people viewing the profile*/
    (view_count: number) => void): this
  /**Emiited when someone starts or stop viewing the profile */
  on(event: 'viewCountUpdate', listener:
    /**@param view_count The number of people viewing the profile*/
    (view_count: number) => void): this
  /**Emitted when the presence is updated */
  on(event: 'presenceUpdate', listener:
    /**
     * @param oldPresence old presence
     * @param newPresence new presence
     */
    (oldPresence: Presence, newPresence: Presence) => void): this
  /**Emitted when the profile is updated */
  on(event: 'profileUpdate', listener:
    /**
     * @param oldProfile profile before
     * @param newProfile profile after
     */
    (oldProfile: Profile, newProfile: Profile) => void): this
  /**Emitted when the profile's banner is updated */
  on(event: 'bannerUpdate', listener:
    /**@param banner_exists Whether the user still has a banner */
    (has_banner: boolean) => void): this
  /**Emitted when the websocket is closed */
  on(event: 'close', listener: () => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }
}
export = Profile
