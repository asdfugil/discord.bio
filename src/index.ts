 import fetch from 'node-fetch'

 /**The main hub for interacting with the discord.bio API. */
class Bio {
    /**
     * Authorization token used by this Bio instance
     */
    private accessToken?:string
    /**The base URL used in making API requests */
    baseURL:string
    /**
     * @param baseURL - The API base URL
     */
    constructor(baseURL?:string){
       this.baseURL = baseURL || `https://api.discord.bio/v1`
    }
    /**
     * Fetch profile by user id or slug,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async fetchUserDetails (slugOrID?: string): Promise<Profile> {
        const profile = await fetch(`${this.baseURL}/UserDetails/${slugOrID}`).then(response => response.json())
        if (profile.message) throw new Error(profile.message)
        if (profile.success) {
            profile.settings.verified = Boolean(profile.settings.verified) 
            profile.settings.premium = Boolean(profile.settings.premium_status)
            delete profile.settings.premium_status
            if (profile.settings.gender === 1) profile.settings.gender = 'male'
            else if (profile.settings.gender === 2) profile.settings.gender = 'female';
            return profile
        }
        else throw new Error('Unknown error.')
    }
    /**
     * Fetch discord connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async fetchDiscordConnections (slugOrID?: string): Promise<Array<DiscordConnection>> {
        const result = await fetch(`${this.baseURL}/DiscordConnections/${slugOrID}`).then(response => response.json())
        if (result.message) throw new Error(result.message)
        return result
    }
    /**
     * Fetch user connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async fetchUserConnections (slugOrID?: string): Promise<UserConnections> {
        const result = await fetch(`${this.baseURL}/UserConnections/${slugOrID}`).then(response => response.json())
        if (result.message) throw new Error(result.message)
        return result
    }
    /**
     * Login by OAuth2 Access Token
     */
    async login(accessToken:string):Promise<string> {
        await fetch(`${this.baseURL}/callback/?code=`+accessToken)
        this.accessToken = accessToken
        return accessToken
    }
    /**Fetches the total number of users using discord.bio */
    async fetchTotalUsers () :Promise<number> {
        const result = await fetch(`${this.baseURL}/totalUsers`).then(response => response.json())
        return result.count
    }
    /**Fetches the API Version */
    async fetchAPIVersion ():Promise<string> {
        const result = await fetch(`${this.baseURL}`).then(response => response.json())
        return result.version
    }
}
export = Bio
/**A Twitter snowflake, except the epoch is 2015-01-01T00:00:00.000Z */
type Snowflake = string
/**The profile settings. */
type ProfileSettings = {
    /**ID of the profile */
    id: number
    /**The slug */
    name: string
    /**User ID of the profile's user. */
    user_id: Snowflake
    /**The time the profile is created.*/
    created_at: string | null
    /**View count of this profile. */
    view_count: number
    /**The ID of the slug. */
    slug_id: number
    /**The status of the user. */
    status: string | null
    /**The description of the user. */
    description: string | null
    /**The location of the user. */
    location: string | null
    /**Gender of the user.*/
    gender: "male" | "female" | null
    /**The birthday of the user. */
    birthday: string | null
    /**The email of the user. */
    email: string | null
    /**The occupation of the user. */
    occupation: string | null
    /**The url to the banner on the profile */
    banner:string | null
    /**Whether the user has discord.bio premium */
    premium:boolean
    /**The number of upvotes the user has got */
    upvotes:number,
    /**The flags on the user's account. https://discordapp.com/developers/docs/resources/user#user-object-user-flags */
    flags:number
    /**Whether the user is verified */
    verified:boolean
}
/**Represent a discord user. */
type User = {
    /**The user id of the user. */
    id: Snowflake
    /**The username of the user. */
    username: string
    /**The avatar hash of the user. */
    avatar: string
    /**The discriminator of the user. */
    discriminator: string
}
/**Represent a discord.bio profile */
type Profile = {
    /**Whether the profile is fetched successfully. */
    success: boolean
    /**The settings of this profile. */
    settings: ProfileSettings
    /**The user that this profile represents. */
    discord: User
}
/**Represent a discord user connection*/
type DiscordConnection = {
    /** The ID of the connection.*/
    id: number
    /**The type of the connection. */
    connection_type: string,
    /**The name of the connection. */
    name: string,
    /**The url of the connection. */
    url: string | null,
    /**Unknown. a non-empty string. */
    icon: string
}
/**An object containing discord.bio connections.The property name is the type of connection.*/
type UserConnections = {
    github: UserConnection,
    website: UserConnection,
    instagram: UserConnection,
    snapchat: UserConnection,
    linkedin: UserConnection
}
/**Represent a connection on discord.bio.*/
type UserConnection = {
    /**The name of the connection.*/
    name: string | null
}
