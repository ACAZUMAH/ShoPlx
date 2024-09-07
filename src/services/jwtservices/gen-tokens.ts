import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors'
require('dotenv').config();

const secret = process.env.JWT_SECRET as string;

/**
 * generating acces token
 * @param id - user id
 * @returns token
 */
export const genAccesToken = (id: object) =>{
    const payload = { user_id: id}
    return jwt.sign(payload, secret, {expiresIn: '2mins'})
}

/**
 * verifying acces token
 * @param req - resquest
 * @param res - response
 * @param next - next function
 * @returns void
 */
export const verifyEmailToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.params.token
    if(token){
        jwt.verify(token as string, secret, (err, user) =>{
            if(err) throw new createError.Forbidden('authentication failed!')
            req.user = user
            next()
        })
    }
}


/**
 * generating refresh token
 * @param id - user id
 * @returns token
 */
export const genRefreshToken = (id: object) =>{
    const payload = { user_id: id}
    return jwt.sign(payload, secret, {expiresIn: '50d'})
}

/**
 * verifying acces token
 * @param req - resquest
 * @param res - response
 * @param next - next function
 * @returns void
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader) throw new createError.Unauthorized('Unauthorized')
    const token = authHeader.split( ' ')[1]
    jwt.verify(token, secret, (err, user) =>{
        if(err) throw new createError.Unauthorized('Unauthorized')
        req.user = user
        next()
    })
}