type Snowfalke = string
type PartialProfileSettings = {
    user_id:Snowfalke
    upvotes:number
    description:string | null
    verified:0 | 1
    premium_status:0
    name:string
}
export = PartialProfileSettings