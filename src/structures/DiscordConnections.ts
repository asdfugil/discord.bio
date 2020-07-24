import { Collection } from 'discord.js'
import DiscordConnection from './DiscordConnection'
class DiscordConnections extends Collection<string, DiscordConnection> {
  constructor(data: {
    [key: string]: {
      name: string,
      id: string
    }
  }) {
    const DiscordConnectionsArray = Object.entries<{
      name: string,
      id: string,
      type?: string
    }>(data)
      .map(([type, connection]) => {
        connection.type = type
        return [connection.id, connection]
      }) as [string, DiscordConnection][]
    super(DiscordConnectionsArray)
  }
}
export = DiscordConnections