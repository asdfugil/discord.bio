import User from './structures/User'
import RawUser from './structures/RawUser'
import details from './rest/user/details'
import search from './rest/user/search'
import totalUsers from './helper_functions/totalUsers'
import topLikes from './rest/topLikes'
import merge from 'deepmerge'
import UserConnections from './structures/UserConnections'
import { UserFlags, ImageURLOptions, Collection, } from 'discord.js'
import Presence from './structures/Presence'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import DBioAPIError from './structures/DBioAPIError'
import ConnectionTypes from './structures/ConnectionTypes'
import Base from './structures/Base'
import RESTManager from './structures/RESTManager'
import { bioOptionsDefaults } from './util/Constants'
import Activity from './structures/Activity'
import Emoji from './structures/Emoji'
import HTTPRequestMethod from './structures/HTTPRequestMethod'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import PartialProfileSettings from './structures/PartialProfileSettings'
import ProfileSettings from './structures/ProfileSettings'
import RichPresenceAssets from './structures/RichPresenceAssets'
import TopInfo from './structures/TopInfo'
import DiscordConnectionsTypes from './structures/DiscordConnectionsTypes'
import DiscordConnection from './structures/DiscordConnection'
import DiscordConnections from './structures/DiscordConnections'
import deepmerge from 'deepmerge'
import scrap from './util/scrap'
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
/**The main hub for interacting with the discord.bio API. */
class Bio extends EventEmitter {
  /**Fetch the top upvoted users, sorted by upvotes.*/
  topLikes: typeof topLikes
  /**Get approximate user count, correct to the nearest 27. */
  totalUsers: typeof totalUsers
  @enumerable(false)
  bio: this
  users: Base & {
    /**
     * Get user Details
     */
    details: typeof details,
    /**
     * Search for profiles on discord.bio,sorted by upvotes 
     */
    search: typeof search
  }
  /**The version of the library */
  version: string
  /**
   * REST Manager
   * @private
   */
  rest: RESTManager
  /**Options of this bio instance */
  options: typeof bioOptionsDefaults
  /**Cached profiles */
  profiles: Collection<string, Profile | PartialProfile>
  scrap: typeof scrap
  /**
   * @param options - bio options
  */
  constructor(options: DeepPartial<typeof bioOptionsDefaults> = {}) {
    super()
    options = merge(bioOptionsDefaults, options)
    this.topLikes = topLikes
    this.totalUsers = totalUsers
    this.users = {
      bio: this,
      details: details,
      search: search,
    }
    this.bio = this
    this.version = require('../package.json').version
    options = deepmerge(bioOptionsDefaults,options)
    this.options = options as typeof bioOptionsDefaults
    this.rest = new RESTManager(this, (options  as typeof bioOptionsDefaults).rest)
    this.scrap = scrap
    this.profiles = new Collection()
  }
  /**Emitted when being rate limited */
  on(event: 'rateLimit', listener:
    /**The number of seconds before a request can be send again */
    (retry_after: number) => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }
}
export { Bio,User, RawUser, UserFlags, ImageURLOptions, DBioAPIError, ConnectionTypes, UserConnections, Collection, Base, Activity, Emoji, HTTPRequestMethod, Profile, PartialProfile, PartialProfileSettings, ProfileSettings, RichPresenceAssets, Presence,
  // Maintain semver
  /**
   * @deprecated Use DBio.TopInfo instead
  */
  TopInfo as LikeInfo,
  TopInfo,DiscordConnectionsTypes,DiscordConnection,DiscordConnections }
