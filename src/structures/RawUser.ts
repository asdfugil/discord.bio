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
    /**Public flags of the suer */
    public_flags:number
    constructor(id: Snowflake, username: string, avatar: string | null, discriminator: string,public_flags:number) {
        this.id = id
        this.username = username
        this.avatar = avatar
        this.discriminator = discriminator
        this.public_flags = public_flags
    }
}
export = RawUser