import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import user from '../models/schemas/user';
import { callCustomError } from '../customErrors/custom-errors';
import { hashPasswrord, comparePassword } from '../utils/hash-passwords';
import { genAccesToken,genRefreshToken } from '../auth-services/gen-tokens';
import sendComfirmationEmail from '../auth-services/send-verication-code'

export const registerUser = async (req: Request, res: Response, next: NextFunction) =>{
    const { first_name, last_name, email, phone, password } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        next(callCustomError(errors.array()[0].msg, 400))
    }else{
        const userExists = await user.findOne({ email })
        if(userExists){
            next(callCustomError('User already exists', 400))
        }
        const hashedPassword = await hashPasswrord(password)
        const newUser = new user({
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        if(!savedUser){
            next(new Error('Something went wrong!'))
        }
        const user_id = savedUser._id 
        const email_token = genAccesToken(user_id)
        sendComfirmationEmail(email, email_token)
        
        // const token = genRefreshToken(_id)
        // res.status(201).json({ success: true, token})
    }
}

export const confirmUser = async (req:Request, res:Response, next:NextFunction) =>{
    const _id = req.user.user_id
    const updateUser = await user.findByIdAndUpdate( { _id: _id }, { isAuthenticated: true } )
    if(!updateUser){
        next(new Error('Something went wrong!'))
    }
    const refresh = genRefreshToken(_id)
    res.status(200).json({ token: refresh})
    //res.header(refresh).redirect('http://localhost:3500/api/v1/ShopX/products/static')
}
export const getUser = async (req: Request, res: Response, next: NextFunction) =>{
    const _id = req.user.user_id
    const User = await user.findById(_id).select('-password')
    if(!User){
        next(callCustomError('User not found', 404))
    }
    res.status(200).json({ success: true, data: User})
}