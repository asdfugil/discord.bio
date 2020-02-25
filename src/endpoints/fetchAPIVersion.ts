import fetch from 'node-fetch'
import Bio from '..'
/**Fetches the API Version */
async function fetchAPIVersion(this:Bio): Promise<string> {
    const result = await fetch(`${this.baseURL}`).then(response => response.json())
    return result.version
}
export = fetchAPIVersion