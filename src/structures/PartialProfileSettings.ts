/**Details of a partial profile */
class PartialProfileSettings {
    /**The number of likes the user has got */
    likes: number
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
    constructor(data:any) {
        const { likes,description,verified,premium,slug,staff } = data
        this.likes = likes
        this.description = description
        this.verified = Boolean(verified)
        this.premium = Boolean(premium)
        this.slug = slug
        this.staff = Boolean(staff)
    }
}
export = PartialProfileSettings