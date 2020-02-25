import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
import PartialProfile from './structures/PartialProfile'
import ClientUser from './structures/ClientUser'
import User from './structures/User'
import RawUser from './structures/RawUser'
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
export class Bio {
    /**The base URL used in making API requests */
    baseURL: string
    /**Authorization cookie. */
    cookie:string
    /**Represent the logged in user. */
    user?:ClientUser
    /**Fetches a user's details */
    fetchUserDetails: (slugOrID:string) => Promise<Profile>
    /**Fetches a user's discord connections */
    fetchDiscordConnections: (this: Bio, slugOrID:string) => Promise<DiscordConnection[]>
    /**Fetches a user's connections */
    fetchUserConnections: (this: Bio, slugOrID:string) => Promise<import("c:/Users/towin/Desktop/nick/not-avaliable/discord.bio/src/structures/UserConnections")>
    /**Fetches total no. of users using discord.bio */
    fetchTotalUsers: (this:Bio) => Promise<number>
    /**Fetches the api version. */
    fetchAPIVersion: (this:Bio) => Promise<string>
    /**Update the logged in user's profile */
    updateProfile: (this:Bio,settings:any) => Promise<void>
    /**Delete the logged in user's profile */
    deleteProfile:(this:Bio,) => Promise<void>
    /**Create a slug for the logged in user.*/
    createSlug:(this:Bio,slug:string) => Promise<void>
    /**Joines the logged in user to the offical server. */
    joinServer: (this: Bio) => Promise<void>
    /**Fetch the top upvoted users */
    fetchTopUpvoted: (this:Bio) => Promise<Array<PartialProfile>>
    upvote: (this: Bio, slugOrID: string) => Promise<void>
    /**Login using session cookie */
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
export { User,ClientUser,RawUser }