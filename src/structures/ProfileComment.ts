import { Bio } from '..'
import User from './User'
import Base from './Base'
type Snowflake = string
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
    fromUser: {
        slug: string
        discordID: Snowflake
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