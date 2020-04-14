import FormData from 'form-data'
import { Readable } from 'stream'
import { Bio } from '../..'
async function banner (this:Bio,stream:Readable):Promise<void> {
    const data = new FormData()
    data.append('file',stream)
    this.api('user/banner','POST',{ cookie:this.cookie },data)
}
export = banner