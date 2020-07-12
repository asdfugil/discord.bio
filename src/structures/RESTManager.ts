import { Bio } from '../'
import { bioOptionsDefaults } from '../util/Constants' 
import api from '../util/api'
import Base from './Base'
/**Rest manager */
class RESTManager extends Base{
    /**Number of sent requests that havn't received a */
    outgoing_requests: number
    /**The time when the quota is getting reseted */
    quota_reset: number
    /**Number of request remaining before getting rate-limited */
    quota: number
    /**Maximum number of requests in a timeframe */
    limit: number
    /**The base URL used in making API requests */
    base_url: string
    /**The URL to discord's CDN */
    cdn_url:string
    api:typeof api
    constructor(bio:Bio,{base_url,cdn_url} = bioOptionsDefaults.rest) {
        super(bio)
        this.outgoing_requests = 0
        this.quota = 100
        this.limit = 100
        this.quota_reset = Date.now()
        this.base_url = base_url
        this.cdn_url = cdn_url
        this.api = api
    }
}
export = RESTManager