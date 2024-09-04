import user from '../../../models/schemas/user';
import { hashPasswrord } from '../../utils/hash-passwords';
import createError from 'http-errors'

/**
 * create user and save to database
 * @param full_name - user full name
 * @param email - user email 
 * @param telephone - user telephone number
 * @param whatsup - user whatsup number
 * @param password - user password
 * @returns returns user id
 * @throws throws error if user already exists
 */
export const createUser = async (full_name:string, email:string, telephone:string, whatsup:string, password:string) =>{
    const hash = await hashPasswrord(password)
    const newUser = await user.create({
        full_name,
        email,
        telephone,
        whatsup,
        password: hash
    })
    if(!newUser){
        throw new createError.InternalServerError('unable to create account')
    }
    return newUser._id
}

/**
 * check if user exists
 * @param email - user email
 * @throws throws error if user already exists
 */
export const checkUserExist = async (email: string) => {
    if(await user.findOne({ email })){
        throw new createError.BadRequest('User already exists')
    }
}

/**
 * find user by id  
 * @param _id - user id
 * @returns returns user
 * @throws error when user not found
 */
export const findUserById = async (_id: string) =>{
    if(!await user.findById(_id)){
        throw new createError.BadRequest('User not found')
    }
    return await user.findById(_id)
}

/**
 * find one user and update
 * @param _id - user id
 * @param full_name - user full name
 * @param email - user email
 * @param telephone - user telephone number
 * @param whatsup - user whatsup number
 * @returns true
 * @throws error when user is not found
 */
export const findOneAndUpdate = async (_id?:string, full_name?:string, email?:string, telephone?:string, whatsup?:string) =>{
    if(_id){
        if(!await user.findById(_id)){
            throw new createError.BadRequest('User not found')
        }
        await user.findByIdAndUpdate( { _id: _id }, { isAuthenticated: true } )
    }
    return true
}