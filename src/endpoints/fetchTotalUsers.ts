import fetch from 'node-fetch'
import Bio from '..'
/**Fetches the total number of users using discord.bio */
async function fetchTotalUsers(this:Bio): Promise<number> {
    const result = await fetch(`${this.baseURL}/totalUsers`).then(response => response.json())
    if (!result.success) throw new Error(result.message || "Unsuccessful response.")
    return result.payload
}
export = fetchTotalUsers