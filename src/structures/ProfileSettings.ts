import { UserFlags } from 'discord.js'
/**The profile settings. */
type ProfileSettings = {
    /**The slug */
    slug: string
    /**User ID of the profile's user. */
    user_id: Snowflake
    /**[DEPRECATED] The date string of the time the profile is created.*/
    created_at: string | null
    /**The date that the profile is created */
    createdAt: Date | null
    /**The timestamp in ms that the profile is created */
    createdTimestamp:number | null
    /**The flags on the user */
    flags:UserFlags
    /**The description of the user. */
    description: string | null
    /**The location of the user. */
    location: string | null
    /**Gender of the user.*/
    gender: "male" | "female" | "non-binary" | null
    /**The birthday of the user. */
    birthday: Date | null
    /**The email of the user. */
    email: string | null
    /**The occupation of the user. */
    occupation: string | null
    /**The url to the banner on the profile */
    banner: string | null
    /**Whether the user has discord.bio premium */
    premium: boolean
    /**The number of upvotes the user has got */
    upvotes: number,
    /**Whether the user is verified */
    verified: boolean
    /**Whether the user is a discord.bio staff*/
    staff:boolean
}
type Snowflake = string
export = ProfileSettings
