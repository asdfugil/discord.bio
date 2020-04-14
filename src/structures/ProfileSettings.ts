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
    banner: string | null
    /**Whether the user has discord.bio premium */
    premium: boolean
    /**The number of upvotes the user has got */
    upvotes: number,
    /**The flags on the user's account. https://discordapp.com/developers/docs/resources/user#user-object-user-flags */
    flags: number
    /**Whether the user is verified */
    verified: boolean
}
type Snowflake = string
export = ProfileSettings