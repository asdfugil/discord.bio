import { Bio } from '../..'
import fetch from 'node-fetch'
/**Joins a user to the offical server. */
async function join(this:Bio): Promise<void> {
    await this.api('/user/join','POST',{ cookie:this.cookie })
}
export = join