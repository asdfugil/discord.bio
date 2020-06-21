import { Snowflake } from 'discord.js'
import Base from './Base'
import { Bio } from '..'
import RawEmoji from './RawEmoji';
import { defaults } from '../util/Constants'
class Emoji extends Base {
    /**Whether the emoji is animated */
    //@ts-ignore
    public animated: boolean;
    /**The time the emoji was created at, or null if unicode*/
    public readonly createdAt: Date | null;
    /**The timestamp the emoji was created at, or null if unicode */
    //@ts-ignore
    public readonly createdTimestamp: number | null;
    /**The ID of this emoji */
    //@ts-ignore
    public id: Snowflake | null;
    /**The name of this emoji */
    //@ts-ignore
    public name: string;
    /**The identifier of this emoji, used for message reactions */
    //@ts-ignore
    public readonly identifier: string;
    /**Whether this emoji has been deleted */
    //@ts-ignore
    public deleted: boolean
    constructor(bio:Bio,data:RawEmoji) {
        super(bio)
        //TypeScript is stupid here
        Object.assign(this,data)
        //@ts-ignore
        this.createdAt = this.createdTimestamp ? new Date(this.createdTimestamp) : null
    }
    /**When concatenated with a string, this automatically returns the text required to form a graphical emoji on Discord instead of the Emoji object.*/
    toString() {
        return this.id ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name;
    }
       /**The URL to the emoji file if its a custom emoji */
    get url() : string | null {
        return this.id ? `${defaults.cdn_url}/emojis/${this.id}.${this.animated ? 'gif' : 'png'}` : null
    }
}
export = Emoji