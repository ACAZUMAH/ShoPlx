import { genSalt, hash, compare } from "bcrypt";

export const hashPasswrord = async (password: string) => {
    try {
        const salt = await genSalt(10)
        return await hash(password, salt)
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        return await compare(password, hashedPassword)
    } catch (error) {
        console.log(error)
    }
}