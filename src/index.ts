import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
import User from './structures/User'
import PartialProfile from './structures/PartialProfile'
import ClientUser from './structures/ClientUser'
import fetchUserDetails from './endpoints/fetchUserDetails'
import fetchDiscordConnections from './endpoints/fetchDiscordConnections'
import fetchUserConnections from './endpoints/fetchUserConnections'
import fetchTotalUsers from './endpoints/fetchTotalUsers'
import fetchAPIVersion from './endpoints/fetchAPIVersion'
import updateProfile from './endpoints/UpdateProfile'
import deleteProfile from './endpoints/deleteProfile'
import createSlug from './endpoints/createSlug'
import joinServer from './endpoints/joinServer'
import fetchTopUpvoted from './endpoints/fetchTopUpvoted'
import upvote from './endpoints/upvote'
import login from './endpoints/login'
/**The main hub for interacting with the discord.bio API. */
class Bio {
    /**The base URL used in making API requests */
    baseURL: string
    /**Authorization cookie. */
    cookie:string
    /**Represent the logged in user. */
    user?:ClientUser
    fetchUserDetails: (slugOrID:string) => Promise<Profile>
    fetchDiscordConnections: (this: Bio, slugOrID:string) => Promise<DiscordConnection[]>
    fetchUserConnections: (this: Bio, slugOrID:string) => Promise<import("c:/Users/towin/Desktop/nick/not-avaliable/discord.bio/src/structures/UserConnections")>
    fetchTotalUsers: (this:Bio) => Promise<number>
    fetchAPIVersion: (this:Bio) => Promise<string>
    updateProfile: (this:Bio,settings:any) => Promise<void>
    deleteProfile:(this:Bio,) => Promise<void>
    createSlug:(this:Bio,slug:string) => Promise<void>
    joinServer: (this: Bio) => Promise<void>
    fetchTopUpvoted: (this:Bio) => Promise<Array<PartialProfile>>
    upvote: (this: Bio, slugOrID: string) => Promise<void>
    login: (this: Bio, cookie: string) => Promise<ClientUser>
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string) {
        this.baseURL = baseURL || `https://api.discord.bio/v1`
        this.fetchUserDetails = fetchUserDetails
        this.fetchDiscordConnections = fetchDiscordConnections
        this.fetchUserConnections = fetchUserConnections
        this.fetchTotalUsers = fetchTotalUsers
        this.fetchAPIVersion = fetchAPIVersion
        this.updateProfile = updateProfile
        this.deleteProfile = deleteProfile
        this.createSlug = createSlug
        this.joinServer = joinServer
        this.fetchTopUpvoted = fetchTopUpvoted
        this.login = login
        this.upvote = upvote
        this.cookie = ''
    }
}
export = Bio