import { Bio }  from '..'
import fetch from 'node-fetch'
import FormData from 'form-data'
import util from 'util'
const pTimoeut = util.promisify(setTimeout)
/**
 * API shortcut
 * @param route The api route including the first /
 * @param method The HTTP request method
 * @param headers Custom headers
 * @param body Request body
 */
async function api(this:Bio,route:string,method:string,headers?:any,body?:string | Buffer | FormData):Promise<any> {
    if (this._quota === 0) await pTimoeut(this._quota_reset - Date.now())
    if (!headers) headers = {}
    if (!headers['User-Agent']) headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
    const response = await fetch(this.baseURL + route,{
        method:method,
        headers:headers,
        body:body
    })
    if (response.status === 429 ) {
        this.emit('rateLimit',
        /**
         * Number of seconds until you can send a request again
         */
        parseInt(response.headers.get('retry-after') as string))
        await pTimoeut(parseInt(response.headers.get('retry-after') as string))
        return this.api(route,method,headers,body)
    }
    this._quota_reset = parseInt(response.headers.get('x-ratelimit-reset') as string)*1000
    this._quota = parseInt(response.headers.get('x-ratelimit-remaining') as string)
    const result = await response.json()
    .catch(_ => {})
    if (!result) {
        if (response.ok) return
        else throw new Error(response.statusText)
    } 
    if (typeof result.success !== 'boolean') return result
    if (result.success === false) throw new Error(result.message || response.status.toString())
    return result
}
export = api