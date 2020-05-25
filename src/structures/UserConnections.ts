/**An object containing discord.bio connections.The property name is the type of connection.*/
type UserConnections = {
    [key in import('./ConnectionTypes')]?: import('./UserConnection')
}
export = UserConnections