import User from './User'
import { Bio } from '..'
import Profile from './Profile'
import Base from './Base'
import { Snowflake } from 'discord.js'
/**An incomplete profile object */
class PartialProfile extends Base {
  /**The number of likes the user has got */
  likes: number
  /**Profile description */
  about: string | null
  /**Whether the user is verified */
  verified: boolean
  /**The discord user id of the user */
  discordID: Snowflake
  /**The slug */
  slug: string
  /**Tags of the user (e.g. Developer)*/
  tags: string[]
  /**Role of user (USER/STAFF) */
  role: "USER" | "STAFF"
  /**The user that this profile represents */
  discord: User
  constructor(bio: Bio, data: any) {
    super(bio)
    const { slug, discordID, about, role, _count, discord, tags, verified } = data
    this.likes = _count.likes
    this.slug = slug
    this.discordID = discordID
    this.about = about
    this.role = role
    this.tags = tags
    this.verified = verified
    discord.id = discordID
    this.discord = new User(this.bio,data.discord)
  }
  /**Fetch this profile */
  async fetch(): Promise<Profile> {
    return this.bio.details(this.discord.id)
  }
}
export = PartialProfile
