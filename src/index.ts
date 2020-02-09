import * as fetch from 'node-fetch'
export = {
    /**
     * Fetch profile by user id or slug
     */
    fetchProfile: async (slugOrID: string): Promise<Profile> => {
        const profile = await fetch(`https://api.discord.bio/v1/getUserDetails/${slugOrID}`).then(response => response.json())
        if (profile.success) {
            if (profile.settings.gender === 1) profile.settings.gender = 'male'
            else if (profile.settings.gender === 2) profile.settings.gender = 'female'
            return profile
        }
        else throw new Error('Unknown slug or user ID.')
    },
    /**
     * Fetch discord connections by slug or user id
     */
    fetchDiscordConnections: async (slugOrID: string): Promise<Array<DiscordConnection>> => await fetch(`https://api.discord.bio/v1/getDiscordConnections/${slugOrID}`).then(response => response.json()),
    /**
     * Fetch user connections by slug or user id
     */
    fetchUserConnections: async (slugOrID: string): Promise<UserConnections> => await fetch(`https://api.discord.bio/v1/getUserConnections/${slugOrID}`).then(response => response.json())
}
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
    gender: string | null
    /**The birthday of the user. */
    birthday: string | null
    /**The email of the user. */
    email: string | null
    /**The occupation of the user. */
    occupation: string | null
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
