import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import User from './structures/User'
import RawUser from './structures/RawUser'
import details from './endpoints/user/details'
import discordConnections from './endpoints/user/discordConnections'
import connections from './endpoints/user/connections'
import fetchTotalUsers from './endpoints/totalUsers'
import APIVersion from './endpoints/APIVersion'
import topUpvoted from './endpoints/topUpvoted'
import api from './util/api'
import FormData from 'form-data'
import UserConnections from './structures/UserConnections'
import { UserFlags,ImageURLOptions } from 'discord.js'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import DBioAPIError from './structures/DBioAPIError'
import Base from './structures/Base'
import ConnectionTypes from './structures/ConnectionTypes'
import UserConnection from './structures/UserConnection'
/**The main hub for interacting with the discord.bio API. */
export class Bio extends EventEmitter {
    _quota_reset: number
    /**Number of request remaining before getting rate-limited */
    _quota: number
    /**The base URL used in making API requests */
    baseURL: string
    /**Fetch the total number of users */
    totalUsers: (this: Bio) => Promise<number>
    /**Fetches the api version. */
    APIVersion: (this: Bio) => Promise<string>
    /**Fetch the top upvoted users */
    topUpvoted: (this: Bio) => Promise<Array<PartialProfile>>
    /**API shortcut. There should be no need to call this method manually.*/
    @enumerable(false)
    readonly api: (this: Bio, route: string, method: string, headers?: any, body?: string | Buffer | FormData) => any
    bio: this
    users: {
        bio: Bio
        /**
         * Get user Details
         * @example bio.details('nickchan')
         */
        details: (this: Base, slugOrID: string) => Promise<Profile>,
        /**Get the user's connection on discord.bio
         * @example bio.connections('nickchan')
         */
        connections: (this: Base, slugOrID: string) => Promise<UserConnections>
        /**Get a user's discord connections */
        discordConnections: (this: Bio, slugOrID: string) => Promise<DiscordConnection[]>
    }
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string) {
        super()
        this.baseURL = baseURL || `https://api.discord.bio/v1`
        this.totalUsers = fetchTotalUsers
        this.APIVersion = APIVersion
        this.topUpvoted = topUpvoted
        this.api = api
        this.users = {
            bio: this,
            details: details,
            connections: connections,
            discordConnections: discordConnections,
        }
        this.bio = this
        this._quota = 100
        this._quota_reset = Date.now()
    }
}
export { User, RawUser, UserFlags,ImageURLOptions,DBioAPIError,ConnectionTypes,UserConnections,UserConnection }
