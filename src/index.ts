import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
import fetchUserDetails from './endpoints/fetchUserDetails'
import fetchDiscordConnections from './endpoints/fetchDiscordConnections'
import fetchUserConnections from './endpoints/fetchUserConnections'
import fetchTotalUsers from './endpoints/fetchTotalUsers'
import fetchAPIVersion from './endpoints/fetchAPIVersion'
import updateProfile from './endpoints/UpdateProfile'
import deleteProfile from './endpoints/deleteProfile'
import createSlug from './endpoints/createSlug'
import joinServer from './endpoints/joinServer'
/**The main hub for interacting with the discord.bio API. */
class Bio {
    /**The base URL used in making API requests */
    baseURL: string
    fetchUserDetails: (options: import("./structures/fetchOptions")) => Promise<Profile>
    fetchDiscordConnections: (this: Bio, options: import("./structures/fetchOptions")) => Promise<DiscordConnection[]>
    fetchUserConnections: (this: Bio, options: import("./structures/fetchOptions")) => Promise<import("c:/Users/towin/Desktop/nick/not-avaliable/discord.bio/src/structures/UserConnections")>
    fetchTotalUsers: (this:Bio,options:import("./structures/fetchOptions")) => Promise<number>
    fetchAPIVersion: (this:Bio) => Promise<string>
    updateProfile: (this:Bio,cookie:string,settings:any) => Promise<void>
    deleteProfile:(this:Bio,cookie:string) => Promise<void>
    createSlug:(this:Bio,cookie:string,slug:string) => Promise<void>
    joinServer: (this: Bio, cookie: string) => Promise<void>
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
    }
}
export = Bio
/**Options used in various fetch methods */