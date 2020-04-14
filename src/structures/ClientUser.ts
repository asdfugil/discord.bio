import User from './User'
import RawClientUser from './RawClientUser'
import UserFlags from './UserFlags'
class ClientUser extends User {
    /**Whether the user have mfa enabled*/
    mfa_enabled: boolean
    /**the connections of the user */
    connections: Array<any>
    /**The public flags on the user */
    public_flags: UserFlags
    /** the type of premium the user has */
    premium_type: number
    /**All flags including privat eflags of this user */
    flags: UserFlags
    constructor(rawClientUser:RawClientUser) {
        const { id,username,avatar,discriminator,mfa_enabled,connections,public_flags,premium_type,flags } = rawClientUser
        super({
            id:id,
            username:username,
            avatar:avatar,
            discriminator:discriminator,
            public_flags:public_flags
        })
        this.mfa_enabled = mfa_enabled
        this.connections = connections
        this.public_flags = new UserFlags(public_flags)
        this.flags = new UserFlags(flags)
        this.premium_type = premium_type

    }
}
export = ClientUser