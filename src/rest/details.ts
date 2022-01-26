import Base from '../structures/Base'
import Profile from '../structures/Profile'
/**
* Get user Details
@example bio.details("nickchan")
*/
async function details(this: Base, slugOrID: string): Promise<Profile> {
  let result;
  if (slugOrID.length > 16) {
    result = await this.bio.rest.api('/user/info?id=' + encodeURIComponent(slugOrID), 'GET', { cookie: this.bio.cookie })
    result.discord.id = result.discordID
  } else {
    let res_text = await this.bio.scrap('/p/' + slugOrID)
    const array = res_text.split('<script id="__NEXT_DATA__" type="application/json">')
    array.shift()
    const new_array = array.join('<script id="__NEXT_DATA__" type="application/json">').split('</script></body></html')
    new_array.pop()
    const json = JSON.parse(new_array.join('</script></body></html'))
    json.props.pageProps.user.discord.id = json.props.pageProps.user.discordID
    result = json.props.pageProps.user
  }
  const profile = new Profile(this.bio, result)
  if (this.bio.options.enableCaching) this.bio.profiles.set(profile.discord.id, profile)
  return profile
}
export = details
