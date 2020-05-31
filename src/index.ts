import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import User from './structures/User'
import RawUser from './structures/RawUser'
import details from './endpoints/user/details'
import search from './endpoints/user/search'
import totalUsers from './endpoints/totalUsers'
import APIVersion from './endpoints/APIVersion'
import topUpvoted from './endpoints/topUpvoted'
import presence from './endpoints/user/presence'
import api from './util/api'
import FormData from 'form-data'
import UserConnections from './structures/UserConnections'
import { UserFlags,ImageURLOptions,Collection,Snowflake } from 'discord.js'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import DBioAPIError from './structures/DBioAPIError'
import Base from './structures/Base'
import ConnectionTypes from './structures/ConnectionTypes'
import UserConnection from './structures/UserConnection'
import { defaults } from './util/Constants'
import HTTPRequestMethod from './structures/HTTPRequestMethod'
import Activity from './structures/Activity'
/**The main hub for interacting with the discord.bio API. */
export class Bio extends EventEmitter {
    __outgoing_requests:number
    __quota_reset: number
    /**Number of request remaining before getting rate-limited */
    __quota: number
    /**Maximum number of requests in a timeframe */
    __limit:number
    /**The base URL used in making API requests */
    baseURL: string
    /**Fetch the total number of users */
    totalUsers: typeof totalUsers
    /**Fetches the api version. */
    APIVersion: typeof APIVersion
    /**Fetch the top upvoted users */
    topUpvoted: typeof topUpvoted
    /**API shortcut. There should be no need to call this method manually.*/
    @enumerable(false)
    readonly api:typeof api
    @enumerable(false)
    bio: this
    users: {
        bio: Bio
        /**
         * Get user Details
         * @example bio.details('nickchan')
         */
        details:typeof details,
        /**Search for profiles on discord.bio */
        search:typeof search
        presence:typeof presence
    }
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string) {
        super()
        this.baseURL = baseURL || defaults.baseurl
        this.__limit = 100
        this.totalUsers = totalUsers
        this.APIVersion = APIVersion
        this.topUpvoted = topUpvoted
        this.api = api
        this.users = {
            bio: this,
            details: details,
            search:search,
            presence:presence
        }
        this.bio = this
        this.__quota = this.__limit
        this.__quota_reset = Date.now()
        this.__outgoing_requests = 0
        this.APIVersion()
    }
}
export { User, RawUser, UserFlags,ImageURLOptions,DBioAPIError,ConnectionTypes,UserConnections,UserConnection,Collection }
