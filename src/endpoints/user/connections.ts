import UserConnections from '../../structures/UserConnections'
import { Bio } from '../..'
/**
 * Fetch user connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
 */
async function connections(this:Bio,slugOrID?:string): Promise<UserConnections> {
    const result = await this.api('/user/connections/' + slugOrID,'GET')
    return result.payload
}
export = connections