  import fetchOptions from '../structures/fetchOptions'
  import DiscordConnection from '../structures/DiscordConnection'
  import fetch from 'node-fetch'
  import Bio from '..'
  /**
     * Fetch discord connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
     */
    async function fetchDiscordConnections(this:Bio,options: fetchOptions): Promise<Array<DiscordConnection>> {
        const result = await fetch(`${this.baseURL}/DiscordConnections/${options.slugOrID}`, {
            headers: {
                cookie: this.cookie
            }
        }).then(response => response.json())
        if (!result.success) throw new Error(result.message || "Unsuccessful response.")
        return result.payload
    }
export = fetchDiscordConnections