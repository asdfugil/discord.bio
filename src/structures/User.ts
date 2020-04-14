import RawUser from  './RawUser'
import UserFlags from './UserFlags'
/**Represent A User */
class User {
    /**The DiscordTag#1234 tag of the user */
    tag: string
    /**The avatar URL of the user */
    avatarURL: string | null
    /**The link to the user's avatr URL,or their default one if they don't have one. */
    displayAvatarURL: string
    /**The link to the user's default avatar URL */
    defaultAvatarURL:string
    public_flags:UserFlags
    username: string
    discriminator: string
    id: string
    avatar: string | null
    /**
     * @param rawUser Thee raw user returned by the API
     */
    constructor(rawUser: RawUser) {
        const { id, username, avatar, discriminator,public_flags } = rawUser
        this.id = id
        this.username = username
        this.discriminator = discriminator
        this.avatar = avatar
        this.tag = `${this.username}#${this.discriminator}`
        rawUser.avatar ? this.avatarURL = `https://cdn.discordapp.com/avatars/${rawUser.id}/${rawUser.avatar}` : this.avatarURL = null
        const a = "https://discordapp.com/assets/"
        const urls = [
            "6debd47ed13483642cf09e832ed0bc1b.png", 
            "322c936a8c8be1b803cd94861bdfa868.png", 
            "dd4dbc0016779df1378e7812eabaa04d.png", 
            "0e291f67c9274a1abdddeb3fd919cbaa.png", 
            "1cbd08c76f8af6dddce02c5138971129.png"
        ].map(x => a + x)
        this.defaultAvatarURL = urls[parseInt(rawUser.discriminator.slice(3))] || urls[parseInt(rawUser.discriminator.slice(3)) - 5]
        this.avatarURL ? this.displayAvatarURL = this.avatarURL : this.displayAvatarURL = this.defaultAvatarURL
        this.public_flags = new UserFlags(public_flags)
    }
}
export = User