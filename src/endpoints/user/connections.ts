import UserConnections from '../../structures/UserConnections'
/**
 * Fetch user connections by slug or user id
 */
async function connections(this:import('../../structures/Base'),slugOrID:string): Promise<UserConnections> {
    const result = await this.bio.api('/user/connections/' + slugOrID,'GET')
    return result.payload
}
export = connections