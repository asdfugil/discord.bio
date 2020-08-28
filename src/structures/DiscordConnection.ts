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
  get url():string {
    switch(this.type) {
      case "github" : return "https://github.com/" + this.name
      case "youtube" : return "https://youtube.com/channel/" + this.name
      case "facebook" : return "https://www.facebook.com"
      case "reddit" : return "https://reddit.com/u/" + this.name
      default: throw new Error(`Unknown connection type "${this.type}".`)
    }
  }
}

export = DiscordConnection