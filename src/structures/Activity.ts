import { ActivityFlags,ActivityType } from 'discord.js'
import Emoji from './Emoji'
import { Bio } from '../'
import RawEmoji from './RawEmoji'
import RichPresenceAssets from './RichPresenceAssets'
class Activity {
    /**Assets for rich presence */
    assets:RichPresenceAssets | null
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
    name:string
    constructor(bio:Bio,data:{
        [key:string]:any,
        emoji:RawEmoji | null
    }) {
        const { name,assets,createdTimestamp,timestamps,state,type,url,party,emoji,details,flags,applicationID } = data
        this.emoji = emoji ? new Emoji(bio,emoji) : null
        this.name = name
        this.assets = assets ? new RichPresenceAssets(this,assets) : null
        this.createdTimestamp = createdTimestamp
        timestamps ? this.timestamps = {
            start:timestamps.start ? new Date(timestamps.start) : null,
            end:timestamps.end ? new Date(timestamps.end) : null,
        } : this.timestamps = null
        this.details = details
        this.state = state
        this.type = type
        this.url = url
        this.party = party
        this.applicationID = applicationID
        this.flags = new ActivityFlags(flags)
    }
  /**
   * Whether this activity is equal to another activity.
   * @param activity The actvity to compare with
   */
  equals(activity:Activity):boolean {
    return (
      this === activity ||
      (activity && this.name === activity.name && this.type === activity.type && this.url === activity.url)
    );
  }
  /**The time the activity was created at */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

}
export = Activity