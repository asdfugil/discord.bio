import { Bio } from '..'
/**Fetches the API Version */
async function APIVersion(this:Bio): Promise<string> {
    const result = await this.api('/','GET')
    return result.version
}
export = APIVersion