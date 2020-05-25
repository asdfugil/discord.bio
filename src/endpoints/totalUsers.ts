import { Bio } from '..'
/**Fetches the total number of users using discord.bio */
async function fetchTotalUsers(this:Bio): Promise<number> {
    const result = await this.api('/totalUsers','GET')
    return result.payload
}
export = fetchTotalUsers