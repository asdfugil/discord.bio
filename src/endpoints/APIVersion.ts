/**Fetches the API Version */
async function APIVersion(this:import('../structures/Base')): Promise<string> {
    const result = await this.bio.api('/','GET')
    return result.version
}
export = APIVersion