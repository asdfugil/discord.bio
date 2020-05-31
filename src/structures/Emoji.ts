import { Snowflake } from 'discord.js'
import Base from './Base'
import { Bio } from '..'
import RawEmoji from './RawEmoji';
class Emoji extends Base {
    //@ts-ignore
    public animated: boolean;
    public readonly createdAt: Date | null;
    //@ts-ignore
    public readonly createdTimestamp: number | null;
    //@ts-ignore
    public id: Snowflake | null;
    //@ts-ignore
    public name: string;
    //@ts-ignore
    public readonly identifier: string;
    //@ts-ignore
    public readonly url: string | null;
    constructor(bio:Bio,data:RawEmoji) {
        super(bio)
        //TypeScript is stupid here
        Object.assign(this,data)
        //@ts-ignore
        this.createdAt = this.createdTimestamp ? new Date(this.createdTimestamp) : null
    }
    toString() {
        return this.id ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name;
    }
}
export = Emoji