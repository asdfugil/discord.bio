import { Snowflake } from 'discord.js'
type RawEmoji = {
    /**Whether the emoji is animated */
    animated: boolean;
    /**The timestamp,in ms,that the emoji is created */
    readonly createdTimestamp: number | null;
    /**The emoji ID */
    id: Snowflake | null;
    /**The name of the emoji */
    name: string;
    /**The identifier of this emoji, used for message reactions. */
    readonly identifier: string;
    /**The URL to the emoji file if its a custom emoji */
    readonly url: string | null;
    /**Whether the emoji has been deleted. */
    deleted:boolean
}
export = RawEmoji