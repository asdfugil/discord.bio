import fetch from 'node-fetch'
import Bio from '..'
async function createSlug(this:Bio,slug: string): Promise<void> {
    console.warn("This endpoint no longer works for users that already have a slug.")
    const result = await fetch(`${this.baseURL}/createSlug/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            cookie: this.cookie
        },
        body: JSON.stringify({ slug: slug })
    }).then(r => r.json())
    if (result.success) return
    else throw new Error (result.message || "unsuccessful response.") 
}
export = createSlug