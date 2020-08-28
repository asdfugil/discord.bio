import RawUser from './RawUser'
import Base from './Base'
import { ImageURLOptions, UserFlags } from 'discord.js'
import { bioOptionsDefaults } from '../util/Constants'
import Presence from './Presence'
import { Bio } from '..'
/**Represent A User */
class User extends Base {
  /**The flags on the user */
  public_flags: UserFlags
  /**The username of the user */
  username: string
  /**This discriminator of the user */
  discriminator: string
  /**The id of the user */
  id: string
  /**The hash of the user's avatar, it will be prepended with "a_" if the avatar is animated */
  avatar: string | null
  /**The presence of the user */
  presence: Presence
  /**
   * @param rawUser Thee raw user returned by the API
   */
  constructor(bio: Bio, rawUser: RawUser) {
    super(bio)
    const { id, username, avatar, discriminator, public_flags } = rawUser
    this.id = id
    this.username = username
    this.discriminator = discriminator
    this.avatar = avatar
    this.public_flags = new UserFlags(public_flags)
    this.presence = new Presence(this.bio, { user: this })
  }
  /**
   * The link to the user's avatar
   * @param options Options for the image
   */
  avatarURL(options: ImageURLOptions & { dynamic?: boolean } = { format: 'webp', dynamic: false }): string | null {
    options.format ? {} : options.format = 'webp'
    let url: string = `${bioOptionsDefaults.rest.cdn_url}/avatars/${this.id}/${this.avatar}`
    if (!this.avatar) return null
    if (!this.avatar.startsWith('a_') && options.format === 'gif') return null
    else url += '.' + options.format;
    if (options.size) url += `?size=${options.size.toString()}`
    return url
  }
  /**
   * The link to the user's avatar if they have one,or to there defualt one if they don't have an avatar.
   * @warn Notice: Default avatar has a fixed size and is always a .png image
   * @param options Options for the image
   */
  displayAvatarURL(options?: ImageURLOptions & { dynamic?: boolean }): string {
    if (this.avatarURL(options)) return this.avatarURL(options) as string
    else return this.defaultAvatarURL
  }
  /**The DiscordTag#1234 tag of the user */
  get tag() {
    return `${this.username}#${this.discriminator}`
  }
    /**The link to the user's default avatar. */
  get defaultAvatarURL() {
    const a = "https://discord.com/assets/"
    const urls = [
      "6debd47ed13483642cf09e832ed0bc1b.png",
      "322c936a8c8be1b803cd94861bdfa868.png",
      "dd4dbc0016779df1378e7812eabaa04d.png",
      "0e291f67c9274a1abdddeb3fd919cbaa.png",
      "1cbd08c76f8af6dddce02c5138971129.png"
    ].map(x => a + x)
    return urls[parseInt(this.discriminator.slice(3))] || urls[parseInt(this.discriminator.slice(3)) - 5]
  }
}
export = User