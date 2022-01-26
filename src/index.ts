import User from './structures/User'
import Connection from './structures/Connection'
import details from './rest/details'
import { search, searchOptions } from './rest/search'
import merge from 'deepmerge'
import UserConnections from './structures/UserConnections'
import { UserFlags, ImageURLOptions, Collection, } from 'discord.js'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import DBioAPIError from './structures/DBioAPIError'
import ConnectionTypes from './structures/ConnectionTypes'
import Base from './structures/Base'
import RESTManager from './structures/RESTManager'
import { bioOptionsDefaults } from './util/Constants'
import HTTPRequestMethod from './structures/HTTPRequestMethod'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import PartialProfileSettings from './structures/PartialProfileSettings'
import deepmerge from 'deepmerge'
import scrap from './util/scrap'
import ProfileComment from './structures/ProfileComment'
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
/**The main hub for interacting with the discord.bio API. */
class Bio extends EventEmitter implements Base {
  @enumerable(false)
  bio: this
  @enumerable(false)
  private _cookie: string | undefined
    /**
     * Get user Details
     */
    details: typeof details
    /**
     * Search for profiles on discord.bio,sorted by upvotes 
     */
    search: typeof search
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
  /**
   * HTML scrapper
   * @private
   */
  scrap: typeof scrap
  /**
   * @param options - bio options
  */
  constructor(options: DeepPartial<typeof bioOptionsDefaults> = {}) {
    super()
    options = merge(bioOptionsDefaults, options)
    this.details = details
    this.search = search
    this.bio = this
    this.version = require('../package.json').version
    options = deepmerge(bioOptionsDefaults, options)
    this.options = options as typeof bioOptionsDefaults
    this.rest = new RESTManager(this, (options as typeof bioOptionsDefaults).rest)
    this.scrap = scrap
    this.profiles = new Collection()
  }
  /**Cookie to send requests*/
  @enumerable(false)
  get cookie() {
    if (this._cookie) return this._cookie
    else {
      const error = new Error('Requested to use cookie, but cookie is unavailable to client.')
      error.name = 'Discord.Bio JS Error'
      throw error
    }
  }
  set cookie(cookie) {
    this._cookie = cookie
  }
  /**Emitted when being rate limited */
  on(event: 'rateLimit', listener:
    /**The number of seconds before a request can be send again */
    (retry_after: number) => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }
}
export { Bio, DeepPartial, Connection, User, UserFlags, ImageURLOptions, DBioAPIError, ConnectionTypes, UserConnections, Collection, Base, HTTPRequestMethod, Profile, PartialProfile, searchOptions, ProfileComment }
