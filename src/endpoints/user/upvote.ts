import { Bio } from '../..'
async function upvote(this:Bio,slugOrID:string):Promise<void> {
    this.api('/user/upvote/' + slugOrID,'POST',{ cookie:this.cookie })
}
export = upvote