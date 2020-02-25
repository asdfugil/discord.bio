import fetch from 'node-fetch'
import { Bio } from '..'
async function upvote(this:Bio,slugOrID:string):Promise<void> {
    const result = await fetch(`${this.baseURL}/upvote/${slugOrID}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({cookie:this.cookie})
    }).then(r => r.json())
    if (result.success) return 
    else throw new Error(result.message || "Unsuccessful response.")
}
export = upvote