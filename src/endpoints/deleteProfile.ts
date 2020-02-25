import fetch from 'node-fetch'
import { Bio } from '..'
async function deleteProfile(this:Bio): Promise<void> {
    const result = await fetch(`${this.baseURL}/deleteProfile/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            cookie: this.cookie
        },
    }).then(response => response.json())
    if (!result.success) throw new Error(result.message || "Unsuccessful response.")
}
export = deleteProfile