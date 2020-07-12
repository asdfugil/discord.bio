import { UserFlags } from 'discord.js'
/**The profile settings. */
class ProfileSettings {
  /**The slug */
  slug: string
  /**User ID of the profile's user. */
  user_id: Snowflake
  createdAt: Date
  /**The timestamp in ms that the profile is created */
  createdTimestamp: number
  /**The flags on the user */
  flags: UserFlags
  /**The description of the user. */
  description: string | null
  /**The location of the user. */
  location: string | null
  /**Gender of the user.*/
  gender: "male" | "female" | "non-binary" | null
  /**The birthday of the user. */
  birthday: Date | null
  /**The email of the user. */
  email: string | null
  /**The occupation of the user. */
  occupation: string | null
  /**The url to the banner on the profile */
  banner: string | null
  /**Whether the user has discord.bio premium */
  premium: boolean
  /**The number of likes the user has got */
  likes: number
  /**Whether the user is verified */
  verified: boolean
  /**Whether the user is a discord.bio staff*/
  staff: boolean
  /**The type of nitro the the user have. 0 for none,1 for nitro classic and 2 for nitro */
  premium_type:number
  constructor(data: any) {
    const { slug, user_id, flags, verified, created_at, description, location, birthday, email, occupation, banner, premium, staff, likes,premium_type } = data
    const gender: 0 | 1 | 2 | null = data.gender
    this.slug = slug
    this.user_id = user_id
    this.flags = new UserFlags(flags)
    this.verified = verified
    this.createdAt = new Date(created_at)
    this.createdTimestamp = created_at
    this.description = description
    this.location = location
    this.email = email
    this.occupation = occupation
    this.banner = banner
    this.premium = premium
    this.staff = staff
    this.likes = likes
    this.premium_type = premium_type
    this.birthday = birthday ? new Date(birthday) : null
    switch (gender) {
      case 0: this.gender = 'male'; break
      case 1: this.gender = 'female'; break
      case 2: this.gender = "non-binary"; break
      case null: this.gender = null; break
    }
  }
}
type Snowflake = string
export = ProfileSettings
