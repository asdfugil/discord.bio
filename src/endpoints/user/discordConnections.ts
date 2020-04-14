  import DiscordConnection from '../../structures/DiscordConnection'
  import { Bio } from '../..'
  /**
     * Fetch discord connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async function discordConnections(this:Bio,slugOrID?: string): Promise<Array<DiscordConnection>> {
        const result = await this.api('/user/discordConnections/' + slugOrID,'GET')
        return result.payload
    }
export = discordConnections