import fetchOptions from '../structures/fetchOptions'
import UserConnections from '../structures/UserConnections'
import fetch from 'node-fetch'
import Bio from '..'
/**
 * Fetch user connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
 */
async function fetchUserConnections(this:Bio,options: fetchOptions): Promise<UserConnections> {
    const result = await fetch(`${this.baseURL}/UserConnections/${options.slugOrID}`, {
        headers: {
            cookie: this.cookie
        }
    }).then(response => response.json())
    if (result.message) throw new Error(result.message)
    if (!result.success) throw new Error(result.message || "Unsuccessful response.")
    return result.payload
}
export = fetchUserConnections