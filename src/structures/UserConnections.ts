import ConnectionTypes from './ConnectionTypes'
/**An object containing discord.bio connections.The property name is the type of connection.*/
type UserConnections = {
    [key in ConnectionTypes]?: string
}
export = UserConnections