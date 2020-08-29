import DiscordConnectsTypes from './DiscordConnectionsTypes'
/**Represent a discord user connection*/
class DiscordConnection {
  /**The type of the connection. */
  type: string
  /**The name of the connection. */
  name: string
  /**The id of the connection */
  id: string
  constructor(type: DiscordConnectsTypes, raw: { name: string, id: string }) {
    this.type = type
    this.name = raw.name
    this.id = raw.id
  }
  /**URL of the connection. When it cannot be determined, it will be null. */
  get url():string | null {
    switch(this.type) {
      case "github" : return "https://github.com/" + this.name
      case "youtube" : return "https://youtube.com/channel/" + this.name
      case "reddit" : return "https://reddit.com/u/" + this.name
      case "steam" : return "https://steamcommunity.com/profiles/" + this.id
      case "twitch" : return "https://www.twitch.tv/" + this.name
      case "twitter" : return "https://twitter.com/" + this.name
      case "spotify" : return "https://open.spotify.com/user/" + this.id
      case "xbox" : return "https://account.xbox.com/en-us/Profile?GamerTag=" + this.name
      //facebook,battlenet,xbox
      default: return null
    }
  }
}

export = DiscordConnection