type PartialProfileSettings = {
    /**The number of likes the user has got */
    likes: number,
    /**@deprecated Please use .likes instead */
    upvotes:number
    /**Profile description */
    description:string | null
    /**Whether the user is verified */
    verified:boolean
    /**Whether the user has discord.bio premium */
    premium:boolean
    /**The slug */
    slug:string
    /**Whether the user is a discord.bio staff */
    staff:boolean
}
export = PartialProfileSettings