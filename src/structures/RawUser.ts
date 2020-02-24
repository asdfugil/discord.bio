type Snowflake = string
class RawUser {
    /**The user id of the user. */
    id: Snowflake
    /**The username of the user. */
    username: string
    /**The avatar hash of the user. */
    avatar: string | null
    /**The discriminator of the user. */
    discriminator: string
    /**The DiscordTag#1234 tag of the user. (E.g. Nick Chan#0001)*/
    constructor(id: Snowflake, username: string, avatar: string | null, discriminator: string) {
        this.id = id
        this.username = username
        this.avatar = avatar
        this.discriminator = discriminator
    }
}
export = RawUser