import { Snowflake } from 'discord.js'
type RawEmoji = {
    animated: boolean;
    readonly createdTimestamp: number | null;
    id: Snowflake | null;
    name: string;
    readonly identifier: string;
    readonly url: string | null;
    deleted:boolean
}
export = RawEmoji