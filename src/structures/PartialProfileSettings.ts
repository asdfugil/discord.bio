type Snowfalke = string
type PartialProfileSettings = {
    user_id:Snowfalke
    upvotes:number
    description:string | null
    verified:boolean
    premium_status:boolean
    name:string
}
export = PartialProfileSettings