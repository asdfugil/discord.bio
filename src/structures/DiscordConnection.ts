/**Represent a discord user connection*/
type DiscordConnection = {
    /**The type of the connection. */
    connection_type: string,
    /**The name of the connection. */
    name: string,
    /**The url of the connection. */
    url: string | null,
    /**The hash of the icon */
    icon: string
}
export = DiscordConnection