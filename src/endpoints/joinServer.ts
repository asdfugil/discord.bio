import Bio from '..'
import fetch from 'node-fetch'
/**Joins a user to the offical server. */
async function joinServer(this:Bio,cookie: string): Promise<void> {
    const result = await fetch(`${this.baseURL}/joinServer/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            cookie: cookie
        },
    }).then(response => response.json())
    if (!result.success) throw new Error(result.message || "Unsuccessful response.")
}
export = joinServer