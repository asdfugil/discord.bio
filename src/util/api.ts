import fetch from 'node-fetch'
import FormData from 'form-data'
import RESTManager from '../structures/RESTManager'
import DBioAPIError from '../structures/DBioAPIError'
import * as constants from './Constants'
import HTTPRequestMethod from '../structures/HTTPRequestMethod'
/**
 * API shortcut
 * @param path The api route including the first /
 * @param method The HTTP request method
 * @param headers Custom headers
 * @param body Request body
 */
async function api(this:RESTManager,path:string,method:HTTPRequestMethod,headers?:any,body?:string | Buffer | FormData):Promise<any> {
    if (this.quota <= this.outgoing_requests) {
        return new Promise<any> (resolve => {
            if (this.quota_reset - Date.now() > 0) setTimeout(()=> {
                resolve(this.api(path,method,headers,body))
            },this.quota_reset - Date.now());
            //Prevent race condition
            //if this is removed it will result in an OOM 
           else setTimeout(()=> {
                resolve(this.api(path,method,headers,body))
            },60000);
        })
    }
    if (!headers) headers = {}
    Object.keys(constants.headers).forEach(key => {
    if (typeof headers[key] === 'undefined') headers[key] = constants.headers[key]
    })
    this.outgoing_requests += 1
    const response = await fetch(this.base_url + path,{
        method:method,
        headers:headers,
        body:body
    })
    this.outgoing_requests -= 1
    const text =  await response.text()
    this.bio.emit('debug',`[API Response] ${text}`)
    if (response.status === 429 ) { //Rate Limit. This should never happen.
        this.bio.emit('rateLimit',
        /**
         * Number of seconds until you can send a request again
         */
        parseInt(response.headers.get('retry-after') as string))
        return new Promise<any>(resolve => {
            setTimeout(() => {
                resolve(this.api(path,method,headers,body))
            },parseInt(response.headers.get('retry-after') as string))
        })
    }
    this.quota_reset = parseInt(response.headers.get('x-ratelimit-reset') as string)*1000
    this.quota = parseInt(response.headers.get('x-ratelimit-remaining') as string)
    let result;
    try {
     result = JSON.parse(text)
    } catch (error) {
        if (text.length < 120 && !response.ok) {
            throw new DBioAPIError({message: text,path,method,statusCode:response.status})
        } else if (!response.ok) {
            throw new DBioAPIError({message: response.statusText,path,method,statusCode:response.status})
        }
    }
    if (!result) {
        if (response.ok) return
        else throw new DBioAPIError({ message:response.statusText,path:path,method:method,statusCode:response.status })
    } 
    if (typeof result.success !== 'boolean' && response.ok) return result
    if (result.success === false || !response.ok) throw new DBioAPIError({message:result.message || response.statusText.toString(),path:path,method:method,statusCode:response.status})
    return result
}
export = api
