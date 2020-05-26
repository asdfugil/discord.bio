type Snowfalke = string
type PartialProfileSettings = {
    /**The user id of the user */
    user_id:Snowfalke
    /**The amount of upvotes the profile has */
    upvotes:number
    /**Profile description */
    description:string | null
    /**Whether the user is verified */
    verified:boolean
    /**Whether the user has discord.bio premium */
    premium:boolean
    /**The slug */
    name:string
}
export = PartialProfileSettings