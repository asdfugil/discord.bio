import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import ClientUser from './structures/ClientUser'
import User from './structures/User'
import RawUser from './structures/RawUser'
import details from './endpoints/user/details'
import discordConnections from './endpoints/user/discordConnections'
import connections from './endpoints/user/connections'
import fetchTotalUsers from './endpoints/totalUsers'
import APIVersion from './endpoints/APIVersion'
import del from './endpoints/user/delete'
import create from './endpoints/user/create'
import topUpvoted from './endpoints/topUpvoted'
import upvote from './endpoints/user/upvote'
import session from './endpoints/session'
import banner from './endpoints/user/banner'
import api from './util/api'
import FormData from 'form-data'
import update from './endpoints/user/update'
import UserConnections from './structures/UserConnections'
import join from './endpoints/user/join'
import billing from './endpoints/billing'
import logout from './endpoints/logout'
import UserFlags from './structures/UserFlags'
import { EventEmitter } from 'events'
import enumerable from './util/enumerable'
import { createHash } from 'crypto'
/**The main hub for interacting with the discord.bio API. */
export class Bio extends EventEmitter {
    _quota_reset: number
    /**Number of request remaining before getting rate-limited */
    _quota: number
    /**The base URL used in making API requests */
    baseURL: string
    /**Authorization cookie. */
    @enumerable(false)
    cookie?: string
    /**Represent the logged in user. */
    user?: ClientUser
    /**Fetch the total number of users */
    totalUsers: (this: Bio) => Promise<number>
    /**Fetches the api version. */
    APIVersion: (this: Bio) => Promise<string>
    /**Fetch the top upvoted users */
    topUpvoted: (this: Bio) => Promise<Array<PartialProfile>>
    @enumerable(false)
    __upvote?: (this: Bio, slugOrID: string) => Promise<void>
    /**Login using session cookie */
    @enumerable(false)
    __session?: (this: Bio, cookie: string) => Promise<ClientUser>
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
    /**Create a slug.Only works for new users */
    @enumerable(false)
    __create?: (this: Bio, slug: string) => Promise<void>
    /**Delete you discord.bio account */
    @enumerable(false)
    __delete?: (this: Bio) => Promise<void>
    /**Returns a user's connections on Discord */
    discordConnections: (this: Bio, slugOrID?: string) => Promise<DiscordConnection[]>
    /**Update your profile*/
    @enumerable(false)
    __update?: (this: Bio, settings: import("./structures/ClientUserProfileSettings")) => Promise<void>
    /**Add you to the offical discord server */
    @enumerable(false)
    __join?: (this: Bio) => Promise<void>
    /**Logout and destroy the cookie */
    @enumerable(false)
    __logout?: (this: Bio) => Promise<void>
    /**Returns billing infromation, the type it set to any because I cannot test this endpoint without premium*/
    @enumerable(false)
    __billing?: (this: Bio) => Promise<any>
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string, _ = 'a') {
        super()
        const hash = '0fe432eda779120085ea907894587ce6f33bb5d0728210cc72e85a9f9f24226870723454661a749b0da68763ee4ac79db223b8de7a2c7fda675bcb7a701cdcdd'
        const keyHash = createHash('sha512').update(_).digest('hex')
        this.baseURL = baseURL || `https://api.discord.bio/v1`
        this.totalUsers = fetchTotalUsers
        this.APIVersion = APIVersion
        this.topUpvoted = topUpvoted
        this.api = api
        this.details = details
        this.connections = connections
        if (hash === keyHash) {
            this.__create = create
            this.__delete = del
            this.__update = update
            this.__join = join
            this.__logout = logout
            this.__billing = billing
            this.__banner = banner
            this.__session = session
            this.__upvote = upvote
        }
        this.discordConnections = discordConnections
        this._quota = 100
        this._quota_reset = Date.now()
    }
}
export { User, ClientUser, RawUser, UserFlags }
