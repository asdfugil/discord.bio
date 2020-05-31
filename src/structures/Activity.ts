import { ActivityFlags,RichPresenceAssets,ActivityType, } from 'discord.js'
import Emoji from './Emoji'
import { Bio } from '../'
import RawEmoji from './RawEmoji'
class Activity {
    assets:RichPresenceAssets
    createdAt:Date
    createdTimestamp:number
    details:string | null
    emoji:Emoji | null
    flags:ActivityFlags
    party: {
        id:string | null,
        size:[number,number]
    } | null
    timestamps: {
        start:Date
        end:Date
    }
    state:string | null
    type:ActivityType
    url:string | null
    applicationID: string | null
    constructor(bio:Bio,data:{
        [key:string]:any,
        emoji:RawEmoji
    }) {
        const { assets,createdTimestamp,timestamps,state,type,url,party,emoji,details,flags,applicationID } = data
        this.emoji = new Emoji(bio,emoji)
        this.assets = assets
        this.createdTimestamp = createdTimestamp
        this.timestamps = timestamps
        this.createdAt = new Date(this.createdTimestamp)
        this.details = details
        this.state = state
        this.type = type
        this.url = url
        this.party = party
        this.applicationID = applicationID
        this.flags = new ActivityFlags(flags)
    }

}
export = Activity