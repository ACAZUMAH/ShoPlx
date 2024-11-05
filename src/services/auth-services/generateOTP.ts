import { Types } from "mongoose";
import { generateOtp, genRefreshToken } from "../../helpers";
import { auth } from "../../models/schemas/user";
import { findAndUpdate, findByCodeAndDelete } from "../users/auth";
import { findOneAndUpdate } from "../users";
import sendVerificationOTP from "./send-verification-code";
import createError from "http-errors";

/**
 * generates otp and sends to user email
 * @param user_id - user id
 * @param email - user email
 * @returns true
 */
export const getOtpAndsend = async (user_id:Types.ObjectId | string, email:string) => {
    let otp = await generateOtp(5);
    while (await auth.findOne({ code: otp })) {
        otp = await generateOtp(5);
    }
    await findAndUpdate(
        { 
            user_id, 
            code: otp, 
            expiresIn: Date.now() + 1 * 60 * 60000 
        }
        
    );
    await sendVerificationOTP(email, otp);
    return true;
}; 

/**
 * verifies otp and generates refresh token
 * @param otp - otp
 * @returns refresh token
 * @throws error if otp is invalid or expired
 */
export const verifyOtp = async (otp: string) => {
    const user: any = await findByCodeAndDelete(otp);
    if(Date.now() > user.expiresIn) {
        throw new createError.BadRequest("OTP expired");
    }
    await findOneAndUpdate({ _id: user.user_id });
    return genRefreshToken(user.user_id);
}