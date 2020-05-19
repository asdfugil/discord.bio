import UserConnections from '../../structures/UserConnections'
import { Bio } from '../..'
/**
 * Fetch user connections by slug or user id
 */
async function connections(this:Bio,slugOrID?:string): Promise<UserConnections> {
    const result = await this.api('/user/connections/' + slugOrID,'GET');
    for (const type of ['github','website','instagram','snapchat','linkedin']) {
        result.payload[type] ? {} : result.payload[type] = { name:null } //semver :)
    }
    return result.payload
}
export = connections