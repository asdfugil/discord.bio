import User from './User'
import RawClientUser from './RawClientUser'
class ClientUser extends User {
    /**Whether the user have mfa enabled*/
    mfa_enabled: boolean
    /**idk */
    connections: unknown
    /**The flags on the user */
    flags: number
    /**idk */
    premium_type: number
    constructor(rawClientUser:RawClientUser) {
        const { id,username,avatar,discriminator,mfa_enabled,connections,flags,premium_type } = rawClientUser
        super({
            id:id,
            username:username,
            avatar:avatar,
            discriminator:discriminator
        })
        this.mfa_enabled = mfa_enabled
        this.connections = connections
        this.flags = flags
        this.premium_type = premium_type

    }
}
export = ClientUser