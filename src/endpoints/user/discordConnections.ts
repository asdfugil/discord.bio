  import DiscordConnection from '../../structures/DiscordConnection'
  /**
     * Fetch discord connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async function discordConnections(this:import('../../structures/Base'),slugOrID: string): Promise<Array<DiscordConnection>> {
        const result = await this.bio.api('/user/discordConnections/' + slugOrID,'GET')
        return result.payload
    }
export = discordConnections