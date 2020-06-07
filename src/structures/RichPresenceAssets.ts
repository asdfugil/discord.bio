import Activity from './Activity';
import { Snowflake } from 'discord.js';
import enumerable from '../util/enumerable'
class RichPresenceAssets {
    @enumerable(false)
    /**Activity that these assets belongs to */
    activity: Activity;
    /** Hover text for the large image*/
    largeText: string | null;
    /**Hover text for the small image*/
    smallText: string | null;
    /**ID of the large image asset*/
    largeImage: Snowflake;
    /**ID of the small image asset*/
    smallImage: Snowflake;
    constructor(activity:Activity, assets:any) {
      this.activity = activity
      this.largeText = assets.largeText || null;
      this.smallText = assets.largeText || null;
      this.largeImage = assets.largeImage || null;
      this.smallImage = assets.smallImage || null;
   }
   /**Gets the URL of the large image asset */
   largeImageURL({ format,size }:{ format?:string,size?:number } = {}):string | null {
    if (!this.largeImage) return null;
    if (/^spotify:/.test(this.largeImage)) {
      return `https://i.scdn.co/image/${this.largeImage.slice(8)}`;
    } else if (/^twitch:/.test(this.largeImage)) {
      return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${this.largeImage.slice(7)}.png`;
    }
    return `https://cdn.discordapp.com/app-assets/${this.activity.applicationID}/${this.largeImage}${ format ? `.${format}` : ''}${size ? `?size=${size}` : ''}`
   }
    /**Gets the URL of the small image asset */
   smallImageURL({ format, size }:{ format?:string,size?:number }  = {}):string | null {
    if (!this.smallImage) return null;
    else return `https://cdn.discordapp.com/app-assets/${this.activity.applicationID}/${this.smallImage}${ format ? `.${format}` : ''}?size=${size}`
  }
}
export = RichPresenceAssets