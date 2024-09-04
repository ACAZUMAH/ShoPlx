import { genSalt, hash, compare } from "bcrypt";
import createError from 'http-errors'

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