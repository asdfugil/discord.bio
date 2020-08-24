import ProfileSettings from './ProfileSettings'
import User from './User'
import UserConnections from './UserConnections'
import enumerable from '../util/enumerable'
import { Bio, Activity } from '..'
import { EventEmitter } from 'events'
import connect from '../websocket'
import WebSocket from 'ws'
import Presence from './Presence'
import DiscordConnections from './DiscordConnections'
import { Snowflake } from 'discord.js'
import { ClientRequest, IncomingMessage } from 'http'
/**
 * Represent a discord.bio profile 
 */
class Profile extends EventEmitter {
  @enumerable(false)
  bio: Bio
  /**The number of people viewing the profile */
  view_count: number | null
  /**The settings of this profile. */
  user: {
    details: ProfileSettings
    discordConnections: DiscordConnections
    userConnections: UserConnections
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
    /**
     * The websocket
     * @private
     */
    socket?: WebSocket
    /**Websocket ping */
    ping?: number
  }
  constructor(bio: Bio, data: any) {
    super()
    this.view_count = null
    const { details, discordConnections, userConnections } = data.user
    this.user = {
      details: new ProfileSettings(details),
      discordConnections: new DiscordConnections(discordConnections),
      userConnections: userConnections || {}
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
    /**
     * @param oldCount The number of people viewing the profile before
     * @param newCount The number of people viewing the profile after
     */
    (oldCount: number, newCount: number) => void): this
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
  /**Emitted when the profile is liked */
  on(event: 'like', listener:
    /**
     * @param liker The user that liked the profile. <br>If there are information about the user in the cache, it will be a User object, otherwise it will be an user id.
     */
    (liker: User | Snowflake) => void): this
  /**Emitted when the profile is unliked */
  on(event: 'unlike', listener:
    /**
     * @param unliker The user that unliked the profile. <br>If there are information about the user in the cache, it will be a User object, otherwise it will be an user id.
     */
    (unliker: User | Snowflake) => void): this
  /**Emitted when the websocket is reconnecting */
  on(event: 'reconnect', listener: () => void): this
  /**Emitted when there is an error trying to (re)connect to the websocket. */
  on(event: 'error', listener: (req: ClientRequest, res: IncomingMessage) => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }
  close() {
    if (!this.ws.socket || this.ws.socket?.CLOSED) throw new Error('WebSocket already closed.')
    this.ws.socket?.close(0, 'Profile#close() called.')
  }
}
export = Profile
