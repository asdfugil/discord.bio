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
import createSlug from './endpoints/user/create'
import topUpvoted from './endpoints/topUpvoted'
import upvote from './endpoints/user/upvote'
import login from './endpoints/login'
import banner from './endpoints/user/banner'
import api from './util/api'
import FormData from 'form-data'
import { version } from '../package.json'
import update from './endpoints/user/update'
import UserConnections from './structures/UserConnections'
import join from './endpoints/user/join'
/**The main hub for interacting with the discord.bio API. */
export class Bio {
    /**The base URL used in making API requests */
    baseURL: string
    /**Authorization cookie. */
    cookie:string
    /**Represent the logged in user. */
    user?:ClientUser
    fetchTotalUsers: (this:Bio) => Promise<number>
    /**Fetches the api version. */
    fetchAPIVersion: (this:Bio) => Promise<string>
    /**Fetch the top upvoted users */
    fetchTopUpvoted: (this:Bio) => Promise<Array<PartialProfile>>
    upvote: (this: Bio, slugOrID: string) => Promise<void>
    /**Login using session cookie */
    login: (this: Bio, cookie: string) => Promise<ClientUser>
    api: (this:Bio,route:string,method:string,headers?:any,body?:string | Buffer | FormData) => any
    users: {
         details: (this: Bio, slugOrID?: string | undefined) => Promise<Profile> 
         banner: (this:Bio,stream:import("stream").Readable) => Promise<void>
         connections: (this:Bio,slugOrID?:string) => Promise<UserConnections>
         create: (this:Bio,slug:string) => Promise<void>
         delete: (this:Bio) => Promise<void>
         discordConnections: (this:Bio,slugOrID?:string) => Promise<DiscordConnection[]>
         update: (this:Bio,settings:import("./structures/ClientUserProfileSettings")) => Promise<void>
         upvote: (this:Bio,slugOrID:string) => Promise<void>
         join:(this:Bio) => Promise<void>
        }
        /** THe version of the library */
    library_version: string
    fetchUserConnections: (this: Bio, slugOrID: string) => Promise<UserConnections>

    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string) {
        this.baseURL = baseURL || `https://api.discord.bio/v1`
        this.fetchUserConnections = connections
        this.fetchTotalUsers = fetchTotalUsers
        this.fetchAPIVersion = APIVersion
        this.fetchTopUpvoted = topUpvoted
        this.login = login
        this.upvote = upvote
        this.api = api
        this.cookie = ''
        this.users = {
            details:details,
            banner:banner,
            connections:connections,
            create:createSlug,
            delete:del,
            discordConnections:discordConnections,
            update:update,
            upvote:upvote,
            join:join
        }
        this.library_version = version
    }
}
export { User,ClientUser,RawUser }
