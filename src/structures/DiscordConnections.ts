import { Collection } from 'discord.js'
import DiscordConnection from './DiscordConnection'
type RawDiscordConnection = {
  name: string,
  id: string,
  type?:string
}
class DiscordConnections extends Collection<string, DiscordConnection> {
  constructor(data: {
    [key: string]: RawDiscordConnection
  }[]) {
    const DiscordConnectionsArray = (data || []).map(conn => {
      const [type,connection] = Object.entries(conn)[0]
      connection.type = type
      return [connection.id,connection]
    })
    super(DiscordConnectionsArray as [string,DiscordConnection][])
  }
}
export = DiscordConnections