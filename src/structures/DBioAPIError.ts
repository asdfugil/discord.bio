class DBioAPIError extends Error {
    /**Request path */
    path: string
    /**Request method */
    method: string
    /**HTTP Response code */
    statusCode:number
    constructor({ message,path,method,statusCode }:{ message:string,path:string,method:string,statusCode:number }) {
        super(message)
        this.name = 'DBioAPIError'
        this.path = path
        this.method = method
        this.statusCode = statusCode
    }
}
export = DBioAPIError