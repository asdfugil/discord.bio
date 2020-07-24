/**Represent a discord user connection*/
type DiscordConnection = {
    /**The type of the connection. */
    type: string,
    /**The name of the connection. */
    name: string,
    /**The id of the connection */
    id:string
}

export = DiscordConnection