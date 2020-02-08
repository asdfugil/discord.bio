import * as fetch from 'node-fetch'
export = {
    /**
     * Fetch profile by user id or slug
     */
    fetchProfile: async (slugOrID: string): Promise<Profile> => {
        const profile: Profile = await fetch(`https://api.discord.bio/v1/getUserDetails/${slugOrID}`).then(response => response.json())
        if (profile.success) return profile
        else throw new Error('Unknown slug or user ID.')
    },
    /**
     * Fetch discord connections by slug or user id
     */
    fetchDiscordConnections: async (slugOrID: string): Promise<Array<DiscordConnection>> => await fetch(`https://api.discord.bio/v1/getDiscordConnections/${slugOrID}`).then(response => response.json()),
    /**
     * Fetch user connections by slug or user id
     */
    fetchUserConnections: async (slugOrID: string): Promise<UserConnections> => await fetch(`https://api.discord.bio/v1/getDiscordConnections/${slugOrID}`).then(response => response.json())
}
type ProfileSettings = {
    id: number
    name: string
    user_id: string
    created_at: string | null
    view_count: number
    slug_id: string
    status: string | null
    description: string | null
    location: string | null
    gender: string | null
    birthday: string | null
    email: string | null
    occupation: string | null
}
type User = {
    id: string
    username: string
    avatar: string
    discriminator: string
}
type Profile = {
    success: boolean
    settings:ProfileSettings
    discord: User
}
type DiscordConnection = {
    id: number
    connection_type: string,
    name: string,
    url: string | null,
    icon: string
}
type UserConnections = {
    github: UserConnection,
    website: UserConnection,
    instagram: UserConnection,
    snapchat: UserConnection,
    linkedin: UserConnection
}
type UserConnection = { name: string | null }