import RawUser from  './RawUser'
/**Represent A User */
class User extends RawUser {
    tag: string
    avatarURL: string | null
    displayAvatarURL: string
    defaultAvatarURL:string
    /**
     * @param rawUser Thee raw user returned by the API
     */
    constructor(rawUser: RawUser) {
        const { id, username, avatar, discriminator } = rawUser
        super(id, username, avatar, discriminator)
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
    }
}
export = User