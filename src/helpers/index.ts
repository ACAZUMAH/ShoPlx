import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors'
import { Types } from 'mongoose';
import { genSalt, hash, compare } from "bcrypt";

/**
 * hashing user password
 * @param password - user password
 * @returns hashed password
 * @throws error when hashing fails 
 * @example
 * const hashed = await hashedPassword('password')
 * console.log(hashed)
 */
export const hashPasswrord = async (password: string) => {
    try {
        const salt = await genSalt(10)
        return await hash(password, salt)
    } catch (error) {
        throw new createError.InternalServerError('Server error')
    }
}

/**
 * compare user password and hashed password
 * @param password - password 
 * @param hash - hashed password
 * @returns true if password is correct else false
 * @throws error when comparison fails
 * @example
 * const isMatch = await comparePass('password', 'hashedPassword')
 * console.log(isMatch)
 */
export const comparePassword = async (password: string, hash: string) => {
    try {
        return await compare(password, hash)
    } catch (error) {
        throw new createError.InternalServerError('Server error')
    }
}


/**
 * generating refresh token
 * @param id - user id
 * @returns token
 */
export const genRefreshToken = (id: string | Types.ObjectId) =>{
    const payload = { _id: id }
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET as string, 
        {expiresIn: '50d'}
    )
}

/**
 * verifying acces token
 * @param req - resquest
 * @param res - response
 * @param next - next function
 * @returns void
 */
export const verifyToken =  (_req: Request, _res: Response, next: NextFunction) =>{
    const authHeader = _req.headers['authorization']
    if(!authHeader) throw new createError.Unauthorized('Unauthorized')
    const token = authHeader.split(' ')[1]
   jwt.verify(
        token, 
        process.env.JWT_SECRET as string, 
        (err, user) =>{
            if(err) throw new createError
            .Unauthorized('Unauthorized')
            _req.user = user
            next()
        }
    )
}

/**
 * generating otp code
 * @param len - length of otp code
 * @returns otp code
 */
export const generateOtp = async (len: number) =>{
    const digits = '0123456789';
    const Length = digits.length;
    let otp = '';
    for(let i = 0; i < len; i++){
        otp += digits.charAt(Math.floor(Math.random() * Length));
    };
    return otp;
}