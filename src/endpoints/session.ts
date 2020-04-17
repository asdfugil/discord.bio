import { Bio } from '..'
import ClientUser from '../structures/ClientUser'
import RawClientUser from '../structures/RawClientUser'
async function login(this:Bio,cookie:string):Promise<ClientUser> {
    const result = await this.api("/session",'GET',{ cookie:cookie })
    this.cookie = cookie
    const raw:RawClientUser = result.payload
    const clientuser = new ClientUser(raw)
    this.user = clientuser
    return clientuser
}
export = login