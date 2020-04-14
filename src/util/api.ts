import { Bio }  from '..'
import fetch from 'node-fetch'
import FormData from 'form-data'
/**
 * API shortcut
 * @param route The api route including the first /
 * @param method The HTTP request method
 * @param headers Custom headers
 * @param body Request body
 */
async function api(this:Bio,route:string,method:string,headers?:any,body?:string | Buffer | FormData) {
    const response = await fetch(this.baseURL + route,{
        method:method,
        headers:headers,
        body:body
    })
    const result = await response.json()
    if (typeof result.success !== 'boolean') return result
    if (result.success === false) throw new Error(result.message || response.status.toString())
    return result
}
export = api