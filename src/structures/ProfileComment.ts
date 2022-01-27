import { Bio } from '..'
import User from './User'
import Base from './Base'
type Snowflake = string
/**Represents a comment on a profile */
class ProfileComment extends Base {
    /**Comment ID */
    id: string
    /**The text of the comment */
    text: string
    /**The Discord user id of the user that wrote this comment */
    fromID: Snowflake
    /**Unknown */
    userID: string
    /**The time this comment is created */
    createdAt: Date
    /**The timestamp this comment is created */
    createdTimestamp: string
    /**Details about the discord.bio user that made the comment */
    fromUser: {
        /**Slug of the user */
        slug: string
        /**Discord user ID of the user */
        discordID: Snowflake
        /**Corresponding Discord user object of the commenter*/
        discord: User
    }
    constructor(bio: Bio, comment: any) {
        super(bio)
        const { id, text, fromID, userID, createdAt } = comment
        this.id = id
        this.text = text
        this.fromID = fromID
        this.userID = userID
        this.createdAt = new Date(createdAt)
        this.createdTimestamp = createdAt
        this.bio = bio
        this.fromUser = {
            slug: comment.fromUser.slug,
            discordID: comment.fromUser.discordID,
            discord: new User(bio,comment.fromUser.discord)
        }
    }
}
export = ProfileComment