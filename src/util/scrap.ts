import fetch from 'node-fetch'
import * as constants from './Constants'
import { Base, DBioAPIError } from '..'
async function scrap(this: Base, path: string, headers?: any): Promise<string> {
    if (!headers) headers = {}
    headers['user-agent'] = constants.headers['user-agent']
    return await fetch(constants.bioOptionsDefaults.scrapper.base_url + path, { headers, method: 'GET' })
    .then(async response => {
        if (!response.ok) throw new DBioAPIError({ message:response.statusText,path:path,method:'GET',statusCode:response.status })
        return await response.text()
    })
}
export = scrap