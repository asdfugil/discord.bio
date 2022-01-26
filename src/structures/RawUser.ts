import { Snowflake } from 'discord.js'
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
     * - null = not revealed by the API
     * - 0 = nothing
     * - 1 = nitro classic
     * - 2 = the nitro with boosts
     */
    premiumType: null | 0 | 1 | 2
}
export = RawUser