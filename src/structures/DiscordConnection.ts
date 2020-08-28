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
      case "facebook" : return null
      case "reddit" : return "https://reddit.com/u/" + this.name
      default: return null
    }
  }
}

export = DiscordConnection