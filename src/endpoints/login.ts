import fetch from 'node-fetch'
import Bio from '..'
import ClientUser from '../structures/ClientUser'
import RawClientUser from '../structures/RawClientUser'
async function login(this:Bio,cookie:string):Promise<ClientUser> {
    const result = await fetch(`${this.baseURL}/getSession`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            cookie:cookie
        }
    }).then (res => res.json())
    if (!result.success) throw new Error(result.message || "Unsuccessful response")
    this.cookie = cookie
    const raw:RawClientUser = result.payload
    const clientuser = new ClientUser(raw)
    this.user = clientuser
    return clientuser
}
export = login