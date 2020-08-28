import { Collection } from 'discord.js'
import DiscordConnection from './DiscordConnection'
import DiscordConnectionsTypes from './DiscordConnectionsTypes'
type RawDiscordConnection = { [key in DiscordConnectionsTypes]?: { name:string, id:string } }
class DiscordConnections extends Collection<string, DiscordConnection> {
  constructor(data: RawDiscordConnection[]) {
    const DiscordConnectionsArray = (data || []).map(conn => {
      const [type,connection] = Object.entries(conn)[0]
      if (!connection) throw Error('undefined connection') // this is actually not possible to happen
      const dconn = new DiscordConnection(type as DiscordConnectionsTypes,connection)
      return [connection.id,dconn]
    })
    super(DiscordConnectionsArray as [string,DiscordConnection][])
  }
}
export = DiscordConnections