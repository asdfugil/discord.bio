import { Bio }  from '..'
import fetch from 'node-fetch'
import FormData from 'form-data'
import util from 'util'
import DBioAPIError from '../structures/DBioAPIError'
import * as constants from './Constants'
const pTimoeut = util.promisify(setTimeout)
/**
 * API shortcut
 * @param path The api route including the first /
 * @param method The HTTP request method
 * @param headers Custom headers
 * @param body Request body
 */
async function api(this:Bio,path:string,method:string,headers?:any,body?:string | Buffer | FormData):Promise<any> {
    if (this._quota === 0) await pTimoeut(this._quota_reset - Date.now())
    if (!headers) headers = {}
    Object.keys(constants.headers).forEach(key => {
    if (typeof headers[key] === 'undefined') headers[key] = constants.headers[key]
    })
    const response = await fetch(this.baseURL + path,{
        method:method,
        headers:headers,
        body:body
    })
    const text =  await response.text()
    this.emit('debug',`[API Response] ${text}`)
    if (response.status === 429 ) { //Rate Limit. This should never happen.
        this.emit('rateLimit',
        /**
         * Number of seconds until you can send a request again
         */
        parseInt(response.headers.get('retry-after') as string))
        await pTimoeut(parseInt(response.headers.get('retry-after') as string))
        return this.api(path,method,headers,body)
    }
    this._quota_reset = parseInt(response.headers.get('x-ratelimit-reset') as string)*1000
    this._quota = parseInt(response.headers.get('x-ratelimit-remaining') as string)
    let result;
    try {
     result = JSON.parse(text)
    } catch (error) {}
    if (!result) {
        if (response.ok) return
        else throw new DBioAPIError({ message:response.statusText,path:path,method:method })
    } 
    if (typeof result.success !== 'boolean') return result
    if (result.success === false) throw new DBioAPIError({message:result.message || response.statusText.toString(),path:path,method:method})
    return result
}
export = api