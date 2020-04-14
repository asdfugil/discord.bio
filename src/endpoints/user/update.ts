import ClientUserProfileSettings from '../../structures/ClientUserProfileSettings'
import { Bio } from '../..'
/**Upate discord.bio profile
 * @param cookie - Session cookie
 * @param settings - The new profile settings
 */
async function update(this:Bio, settings: ClientUserProfileSettings): Promise<void> {
    this.api('/users/update','POST',{ cookie:this.cookie },JSON.stringify(settings))
}
export = update