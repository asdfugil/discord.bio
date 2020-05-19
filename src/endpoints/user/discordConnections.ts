import DiscordConnection from '../../structures/DiscordConnection'
import { Collection } from 'discord.js'
  /**
     * Fetch discord connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async function discordConnections(this:import('../../structures/Base'),slugOrID: string): Promise<Collection<number,DiscordConnection>> {
        const result = await this.bio.api('/user/discordConnections/' + slugOrID,'GET')
        result.payload = new Collection(result.payload.map((entry:DiscordConnection) => [entry.id,entry]))
        return result.payload
    }
export = discordConnections