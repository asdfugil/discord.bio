import { UserFlags } from 'discord.js'
import User from './User'
import ProfileComment from './ProfileComment'
import enumerable from '../util/enumerable'
import { Bio } from '..'
import { EventEmitter } from 'events'
import { Snowflake } from 'discord.js'
import Connection from './Connection'
import Base from './Base'
/**
 * Represent a discord.bio profile 
 */
class Profile extends EventEmitter implements Base {
  @enumerable(false)
  bio: Bio
  /**The settings of this profile */
  connections: Connection[]
  /**The comments on the profile */
  comments: ProfileComment[]
  /**The user that this profile represents. */
  discord: User
  /**The slug */
  slug: string
  /**User ID of the profile's user. */
  discordID: Snowflake
  /**When is the profile created */
  createdAt: Date
  /**The timestamp in ms that the profile is created */
  createdTimestamp: number
  /**The flags on the user */
  publicFlags: UserFlags
  /**The location of the user. */
  location: string | null
  /**Gender of the user.*/
  gender: "MALE" | "FEMALE" | "NONBINARY" | null
  /**The birthday of the user. */
  birthday: Date | null
  /**The email of the user. */
  email: string | null
  /**The occupation of the user. */
  occupation: string | null
  /**The url to the banner on the profile */
  banner: string | null
  /**The number of likes the user has got */
  likes: number
  /**Whether the user is verified */
  verified: boolean
  /**The role of the user (USER/STAFF) */
  role: "USER" | "STAFF"
  /**Whether rich presence is present on the user's profile (does not appear to do anything)*/
  rpcEnabled: boolean
  /**Whether the profile could be searched */
  searchEnabled: boolean
  /**Whether comments are enabled on the profile */
  commentsEnabled: boolean
  /**When is the profile last updated */
  updatedAt: Date
  /**Timestamp when the profile is last updated */
  updatedTimestamp: string
  /**Profile description */
  about: string | null
  constructor(bio: Bio, data: any) {
    super()
    const {
      role,
      rpcEnabled,
      commentsEnabled,
      searchEnabled,
      slug,
      discordID,
      publicFlags,
      verified,
      createdAt,
      updatedAt,
      location,
      birthday,
      email,
      occupation,
      about,
      banner,
      _count
    } = data
    this.slug = slug
    this.discordID = discordID
    this.searchEnabled = searchEnabled
    this.commentsEnabled = commentsEnabled
    this.rpcEnabled = rpcEnabled
    this.publicFlags = new UserFlags(publicFlags)
    this.verified = Boolean(verified)
    this.createdAt = new Date(createdAt)
    this.createdTimestamp = createdAt
    this.updatedAt = new Date(updatedAt)
    this.updatedTimestamp = updatedAt
    this.about = about
    this.location = location
    this.email = email
    this.occupation = occupation
    this.banner = banner
    this.role = role
    this.likes = _count.likes
    this.birthday = birthday ? new Date(birthday) : null
    this.gender = data.gender
    this.connections = data.connections.map((x: any) => new Connection(x))
    this.comments = data.comments.map((x: any) => new ProfileComment(bio, x))
    this.bio = bio
    this.discord = new User(this.bio, data.discord)
  }
  async fetch(): Promise<Profile> {
    return this.bio.details(this.discord.id)
  }
}
export = Profile
