class DBioAPIError extends Error {
    /**Request path */
    path: string
    /**Request method */
    method: string
    constructor({ message,path,method }:{ message:string,path:string,method:string}) {
        super(message)
        this.name = 'DBioAPIError'
        this.path = path
        this.method = method
    }
}
export = DBioAPIError