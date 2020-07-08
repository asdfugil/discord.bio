import { Bio } from '../index'
// BRUH why remove the /totalUsers endpoint ?????
/**Get approximate user count, correct to the nearest 27. */
async function totalUsers(this:Bio):Promise<number> {
  const likeinfo = await this.topLikes()
  return likeinfo.pageTotal * likeinfo.users.size
}
export = totalUsers