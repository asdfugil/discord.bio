import User from './structures/User'
import RawUser from './structures/RawUser'
import details from './endpoints/user/details'
import search from './endpoints/user/search'
import APIVersion from './endpoints/APIVersion'
import topLikes from './endpoints/topLikes'
import presence from './endpoints/user/presence'
import api from './util/api'
import UserConnections from './structures/UserConnections'
import { UserFlags, ImageURLOptions, Collection, } from 'discord.js'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import DBioAPIError from './structures/DBioAPIError'
import ConnectionTypes from './structures/ConnectionTypes'
import { defaults } from './util/Constants'
import { deprecate } from 'util'
import Base from './structures/Base'
/**The main hub for interacting with the discord.bio API. */
export class Bio extends EventEmitter {
    __outgoing_requests: number
    __quota_reset: number
    /**Number of request remaining before getting rate-limited */
    __quota: number
    /**Maximum number of requests in a timeframe */
    __limit: number
    /**The base URL used in making API requests */
    baseURL: string
    /**Fetches the api version. */
    APIVersion: typeof APIVersion
    /**Fetch the top upvoted users, sorted by upvotes.*/
    topLikes: typeof topLikes
    /**API shortcut. There should be no need to call this method manually.*/
    @enumerable(false)
    readonly api: typeof api
    @enumerable(false)
    bio: this
    //public on<K extends keyof BioEvents>(event: K, listener: (...args: BioEvents[K]) => void): this;  
      users: Base & {
        /**
         * Get user Details
         * @example bio.details('nickchan')
         */
        details: typeof details,
        /**Search for profiles on discord.bio,sorted by upvotes */
        search: typeof search
        presence: typeof presence
    }
    totalUsers: () => number
    topUpvoted: typeof topLikes
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string) {
        super()
        this.baseURL = baseURL || defaults.baseurl
        this.__limit = 100
        this.APIVersion = APIVersion
        this.topLikes = topLikes
        //semver
        this.topUpvoted = deprecate(this.topLikes,'Please use .topLikes() instead')
        //semver
        this.totalUsers = deprecate(function () { return 1 }, 'This endpoint no longer exists')
        this.api = api
        this.users = {
            bio: this,
            details: details,
            search: search,
            presence: presence
        }
        this.bio = this
        this.__quota = this.__limit
        this.__quota_reset = Date.now()
        this.__outgoing_requests = 0
        this.APIVersion()
    }
}
export { User, RawUser, UserFlags, ImageURLOptions, DBioAPIError, ConnectionTypes, UserConnections, Collection }
