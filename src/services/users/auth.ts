import { auth } from "../../models/schemas/user";
import { Types } from "mongoose";
import { authType } from "../Types";
import createError from "http-errors";

/**
 * creates a new auth record in the database
 * @param user_id user id
 * @returns boolean true
 */
export const createAuth = async (user_id: Types.ObjectId | string) => {
    await auth.create({ user_id });
    return true;
};

/**
 * find auth record by user id and update the code and expiration time
 * @param user_id user id
 * @returns boolean true
 *  @throws throws error if user not found
 */
export const findAndUpdate = async (data: authType ) => {
    if(!await auth.findOne({ user_id: data.user_id })) {
        throw new createError.BadRequest("User not found");
    }
    await auth.findOneAndUpdate({ user_id: data.user_id }, { ...data });
    return true;
};

/**
 * find auth record by code
 * @param code code
 * @returns auth record
 *  @throws throws error if code is invalid
 */
export const findByCodeAndDelete = async (code: string) => {
    if(!await auth.findOne({ code })) {
        throw new createError.BadRequest("Invalid code");
    }
    return await auth.findOneAndDelete({ code });
}