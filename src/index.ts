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
import UserFlags from './structures/UserFlags'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
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
    /**
     * Get user Details
     * @example bio.details('nickchan')
     */
    details: (this: Bio, slugOrID?: string | undefined) => Promise<Profile>
    /**Upload a banner!
     * @example bio.banner(fs.createWriteStream("./banner.png"))
     * @example const fetch = require('node-fetch')
     * fetch("https://pngimage.net/wp-content/uploads/2018/06/test-png-1.png")
     * .then(res => bio.banner(res.body))
     */
    @enumerable(false)
    __banner?: (this: Bio, stream: import("stream").Readable) => Promise<void>
    /**Get the user's connection on discord.bio
     * @example bio.connections('nickchan')
     */
    connections: (this: Bio, slugOrID?: string) => Promise<UserConnections>
    /**Returns a user's connections on Discord */
    discordConnections: (this: Bio, slugOrID?: string) => Promise<DiscordConnection[]>
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
        this.details = details
        this.connections = connections
        this.discordConnections = discordConnections
        this._quota = 100
        this._quota_reset = Date.now()
    }
}
export { User, RawUser, UserFlags }
