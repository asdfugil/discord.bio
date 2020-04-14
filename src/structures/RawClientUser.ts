type RawClientUser = {
    /**The user id of the user. */
    id: Snowflake
    /**The username of the user. */
    username: string
    /**The avatar hash of the user. */
    avatar: string | null
    /**The discriminator of the user. */
    discriminator: string
    /**The locale of the user */
    locale:string
    /**idk */
    premium_type:number
    /**Whether the suer have MFA enabled. */
    mfa_enabled:boolean
    /**The flags on this user */
    flags:number
    /**idk */
    connections:Array<any>
    public_flags:number
}
type Snowflake = string
export = RawClientUser