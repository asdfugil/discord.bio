import { ActivityFlags,RichPresenceAssets,ActivityType, } from 'discord.js'
import Emoji from './Emoji'
import { Bio } from '../'
import RawEmoji from './RawEmoji'
class Activity {
    /**Assets for rich presence */
    assets:RichPresenceAssets
    /**The time the activity was created at */
    createdAt:Date
    /**Creation date of the activity */
    createdTimestamp:number
    /**Details about the activity */
    details:string | null
    /**Emoji for a custom activity */
    emoji:Emoji | null
    /**Flags that describe the activity */
    flags:ActivityFlags
    /**Party of the activity */
    party: {
        /**ID of the party */
        id:string | null,
        /** Size of the party as [current, max]*/
        size:[number,number]
    } | null
    /**Timestamps for the activity */
    timestamps: {
        /**When the activity started */
        start:Date | null
        /**When the activity will end */
        end:Date | null
    } | null
    /**State of the activity*/
    state:string | null
    /**The type of the activity status */
    type:ActivityType
    /**If the activity is being streamed, a link to the stream */
    url:string | null
    /**Application ID associated with this activity */
    applicationID: string | null
    constructor(bio:Bio,data:{
        [key:string]:any,
        emoji:RawEmoji
    }) {
        const { assets,createdTimestamp,timestamps,state,type,url,party,emoji,details,flags,applicationID } = data
        this.emoji = new Emoji(bio,emoji)
        this.assets = assets
        this.createdTimestamp = createdTimestamp
        timestamps ? this.timestamps = {
            start:timestamps.start ? new Date(timestamps.start) : null,
            end:timestamps.end ? new Date(timestamps.end) : null,
        } : this.timestamps = null
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