import { Bio } from '../'
import { bioOptionsDefaults } from '../util/Constants' 
import api from '../util/api'
class RESTManager {
    bio:Bio
    outgoing_requests: number
    quota_reset: number
    /**Number of request remaining before getting rate-limited */
    quota: number
    /**Maximum number of requests in a timeframe */
    limit: number
    /**The base URL used in making API requests */
    base_url: string
    cdn_url:string
    api:typeof api
    constructor(bio:Bio,{base_url,cdn_url} = bioOptionsDefaults.rest) {
        this.outgoing_requests = 0
        this.quota = 100
        this.limit = 100
        this.quota_reset = Date.now()
        this.bio = bio
        this.base_url = base_url
        this.cdn_url = cdn_url
        this.api = api
    }
}
export = RESTManager