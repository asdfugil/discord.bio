import UserConnections from '../../structures/UserConnections'
/**
 * Fetch user connections by slug or user id,if sulgOrID is not provided,it will retrun the details of the logged in user.
 */
async function connections(this:import('../../structures/Base'),slugOrID:string): Promise<UserConnections> {
    const result = await this.bio.api('/user/connections/' + slugOrID,'GET')
    return result.payload
}
export = connections