export class customError extends Error{
    constructor(msg: string, public statusCode: number){
        super(msg)
        this.statusCode = statusCode
    }
}

export const callCustomError = (msg: string, statusCode: number) =>{
    return new customError(msg, statusCode)
}
