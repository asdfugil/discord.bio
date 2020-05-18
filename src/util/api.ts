import { Bio }  from '..'
import fetch from 'node-fetch'
import FormData from 'form-data'
import util from 'util'
import DBioAPIError from '../structures/DBioAPIError'
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
    if (!headers['User-Agent']) headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
    headers['content-type'] ? {} : headers['content-type'] = 'application/json; charset=utf-8'
    const response = await fetch(this.baseURL + path,{
        method:method,
        headers:headers,
        body:body
    })
  const text =  await response.text()
this.emit('debug',`[API Response] ${text}`)
    if (response.status === 429 ) {
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
    console.log(result)
    if (!result) {
        if (response.ok) return
        else throw new DBioAPIError({ message:response.statusText,path:path,method:method })
    } 
    if (typeof result.success !== 'boolean') return result
    if (result.success === false) throw new DBioAPIError({message:result.message || response.statusText.toString(),path:path,method:method})
    return result
}
export = api