import fetch from 'node-fetch'
import { Bio } from '../..'
async function createSlug(this:Bio,slug: string): Promise<void> {
    this.api('/user/create','POST', { cookie:this.cookie },JSON.stringify({slug:slug}))
}
export = createSlug