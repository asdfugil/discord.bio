import fetch from 'node-fetch'
import { Bio } from '../..'
async function del(this:Bio): Promise<void> {
    this.api('/user/delete','DELETE',{ cookie:this.cookie })
}
export = del