import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { genAccesToken,genRefreshToken } from '../services/auth-services/gen-tokens';
import sendComfirmationEmail from '../services/auth-services/send-verification-code'
import { checkUserExist, createUser, findOneAndUpdate, findUserById } from '../services/helpers/users';

/**
 * controller to register user
 * @param req - request
 * @param res - response
 * @returns - response when user is created and confirmation email is sent
 * @throws - error when user already or validation fails
 */
export const registerUser = async (req: Request, res: Response) =>{
    const { full_name,email,telephone,whatsup, password } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new createError.BadRequest(errors.array()[0].msg)
    }
    await checkUserExist(email)
    const user = await createUser(full_name,email,telephone,whatsup,password)
    const email_token = genAccesToken(user)
    sendComfirmationEmail(email, email_token)
    return res.status(201).json( { success: true, message: 'comfirmation email sent'})
}

/**
 * controller for verification and generating refresh token
 * @param req - request
 * @param res - response
 * @returns send refresh token 
 * @throws 
 */
export const confirmUser = async (req:Request, res:Response) =>{
    const _id = req.user.user_id
    await findOneAndUpdate(_id)
    const refresh = genRefreshToken(_id)
    res.status(200).json({ token: refresh})
}

/**
 * controller for getting user
 * @param req - request
 * @param res - response
 * @returns user
 */
export const getUser = async (req: Request, res: Response) =>{
    const _id = req.user.user_id
    const User = await findUserById(_id)
    res.status(200).json({ success: true, data: User})
}