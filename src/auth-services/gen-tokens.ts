import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { callCustomError } from '../customErrors/custom-errors';
require('dotenv').config();

const secret = process.env.JWT_SECRET as string;

export const genAccesToken = (id: object) =>{
    const payload = { user_id: id}
    return jwt.sign(payload, secret, {expiresIn: '2mins'})
}
export const verifyEmailToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.params.token
    if(token){
        jwt.verify(token as string, secret, (err:any, decoded: any) =>{
            if(err){
                next(callCustomError('authentication failed!', 400))
            }
            req.user = decoded
            next()
        })
    }
}
export const genRefreshToken = (id: object) =>{
    const payload = { user_id: id}
    return jwt.sign(payload, secret, {expiresIn: '50d'})
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader){
        next(callCustomError('Unauthorized', 401))
        return 
    }
    const token = authHeader.split( ' ')[1]
    //console.log(token)
    jwt.verify(token, secret, (err: any, decoded: any) =>{
        if(err){
            next(callCustomError('Unauthorized', 403))
        }
        req.user = decoded
        next()
    })
}