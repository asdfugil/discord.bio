import fetch from 'node-fetch'
import UserConnections from './structures/UserConnections'
import DiscordConnection from './structures/DiscordConnection'
import Profile from './structures/Profile'
/**The main hub for interacting with the discord.bio API. */
class Bio {
    /**
     * Authorization token used by this Bio instance
     */
    private accessToken?: string
    /**The base URL used in making API requests */
    baseURL: string
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?: string) {
        this.baseURL = baseURL || `https://api.discord.bio/v1`
    }
    /**
     * Fetch profile by user id or slug,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async fetchUserDetails(options: fetchOptions): Promise<Profile> {
        const profile = await fetch(`${this.baseURL}/UserDetails/${options.slugOrID || ''}`, {
            headers: {
                cookie: options.cookie || ''
            }
        }).then(response => response.json())
        if (profile.success) {
            profile.payload.settings.verified = Boolean(profile.payload.settings.verified)
            profile.payload.settings.premium = Boolean(profile.payload.settings.premium_status)
            delete profile.payload.settings.premium_status
            profile.payload.discord.tag = `${profile.payload.discord.username}#${profile.payload.discord.discriminator}`
            profile.payload.discord.avatarURL = `https://cdn.discordapp.com/avatars/${profile.payload.discord.id}/${profile.payload.discord.avatar}`
            if (profile.payload.settings.gender === 1) profile.payload.settings.gender = 'male'
            else if (profile.payload.settings.gender === 2) profile.payload.settings.gender = 'female';
            return profile.payload
        }
        else throw new Error(profile.message || 'Unsuccessful response.')
    }
    /**
     * Fetch discord connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async fetchDiscordConnections(options: fetchOptions): Promise<Array<DiscordConnection>> {
        const result = await fetch(`${this.baseURL}/DiscordConnections/${options.slugOrID}`, {
            headers: {
                cookie: options.cookie || ''
            }
        }).then(response => response.json())
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
        return result.payload
    }
    /**
     * Fetch user connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async fetchUserConnections(options: fetchOptions): Promise<UserConnections> {
        const result = await fetch(`${this.baseURL}/UserConnections/${options.slugOrID}`, {
            headers: {
                cookie: options.cookie || ''
            }
        }).then(response => response.json())
        if (result.message) throw new Error(result.message)
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
        return result.payload
    }
    /**Fetches the total number of users using discord.bio */
    async fetchTotalUsers(): Promise<number> {
        const result = await fetch(`${this.baseURL}/totalUsers`).then(response => response.json())
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
        return result.payload
    }
    /**Fetches the API Version */
    async fetchAPIVersion(): Promise<string> {
        const result = await fetch(`${this.baseURL}`).then(response => response.json())
        return result.version
    }
    async updateProfile(cookie: string, settings: any): Promise<void> {
        const result = await fetch(`${this.baseURL}/updateProfile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                cookie: cookie
            },
            body: JSON.stringify(settings)
        }).then(response => response.json())
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
    }
    async deleteProfile(cookie: string): Promise<void> {
        const result = await fetch(`${this.baseURL}/deleteProfile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                cookie: cookie
            },
        }).then(response => response.json())
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
    }
    async joinServer(cookie: string): Promise<void> {
        const result = await fetch(`${this.baseURL}/joinServer/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                cookie: cookie
            },
        }).then(response => response.json())
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
    }
    async createSlug(cookie: string, slug: string): Promise<void> {
        const result = await fetch(`${this.baseURL}/createSlug/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                cookie: cookie
            },
            body: JSON.stringify({ slug: slug })
        })

    }
    async fetchTopUpvoted() {

    }
    async upVote() {

    }
}
export = Bio
/**Options used in various fetch methods */
type fetchOptions = {
    slugOrID?: string,
    cookie?: string
}
