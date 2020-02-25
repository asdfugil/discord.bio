import fetch from 'node-fetch'
import Bio from '..'
async function createSlug(this:Bio,cookie: string, slug: string): Promise<void> {
    const result = await fetch(`${this.baseURL}/createSlug/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            cookie: cookie
        },
        body: JSON.stringify({ slug: slug })
    }).then(r => r.json())
    if (result.success) return
    else throw new Error (result.message || "unsuccessful response.") 
}
export = createSlug