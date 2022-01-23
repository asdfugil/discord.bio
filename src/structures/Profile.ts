import ProfileSettings from './ProfileSettings'
import { UserFlags } from 'discord.js'
import User from './User'
import ProfileComment from './ProfileComment'
import enumerable from '../util/enumerable'
import { Bio, Activity, DiscordConnection } from '..'
import { EventEmitter } from 'events'

import Presence from './Presence'
import DiscordConnections from './DiscordConnections'
import { Snowflake } from 'discord.js'
import Connection from './Connection'
/**
 * Represent a discord.bio profile 
 */
class Profile extends EventEmitter {
  @enumerable(false)
  bio: Bio
  /**The number of people viewing the profile */
  view_count: number | null
  /**The settings of this profile. */
  connections: Connection[]
  comments: ProfileComment[]
  /**The user that this profile represents. */
  discord: User
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
  premium_type: number
  constructor(bio: Bio, data: any) {
    super()
    const { slug, user_id, flags, verified, created_at, description, location, birthday, email, occupation, banner, premium, staff, likes,premium_type } = data
    this.slug = slug
    this.user_id = user_id
    this.flags = new UserFlags(flags)
    this.verified = Boolean(verified)
    this.createdAt = new Date(created_at)
    this.createdTimestamp = created_at
    this.description = description
    this.location = location
    this.email = email
    this.occupation = occupation
    this.banner = banner
    this.premium = Boolean(premium)
    this.staff = Boolean(staff)
    this.likes = likes
    this.premium_type = premium_type
    this.birthday = birthday ? new Date(birthday) : null
    this.gender = data.gender
    this.view_count = null
    this.connections = data.connections.map((x:any) => new Connection(x))
    this.comments = data.comments.map((x:any) => new ProfileComment(this.bio, x))
    this.bio = bio
    this.discord = new User(this.bio, data.discord)
  }
  async fetch(): Promise<Profile> {
    return this.bio.users.details(this.discord.id)
  }
}
export = Profile
