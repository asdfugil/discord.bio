import UserConnection from './UserConnection'
/**An object containing discord.bio connections.The property name is the type of connection.*/
type UserConnections = {
    github: UserConnection,
    website: UserConnection,
    instagram: UserConnection,
    snapchat: UserConnection,
    linkedin: UserConnection
}
export = UserConnections