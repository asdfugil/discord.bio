import fetch from 'node-fetch'
import { Bio } from '..'
/**Upate discord.bio profile
 * @param cookie - Session cookie
 * @param settings - The new profile settings
 */
async function updateProfile(this:Bio, settings: any): Promise<void> {
    const result = await fetch(`${this.baseURL}/updateProfile/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            cookie: this.cookie
        },
        body: JSON.stringify(settings)
    }).then(response => response.json())
    if (!result.success) throw new Error(result.message || "Unsuccessful response.")
}
export = updateProfile