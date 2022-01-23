type Snowflake = string
type RawUser = {
    /**The user id of the user. */
    id: Snowflake
    /**The username of the user. */
    username: string
    /**The avatar hash of the user. */
    avatar: string | null
    /**The discriminator of the user. */
    discriminator: string
    /**Public flags of the suer */
    public_flags: number
    /** The type of nitro the user has.
     * Is always null since we did anonymous requests,
     * and it only shows when you fetch your own profile.
     */
    premiumType: null
}
export = RawUser